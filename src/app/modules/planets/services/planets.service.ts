import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { RadiusRatioEarth } from '@shared/constants';
import {
  Container,
  ControlsFactory,
  DollyCameraFactory,
  DollyCameraParams,
  EarthFactory,
  LoopManager,
  MarsFactory,
  NeptuneFactory,
  SaturnFactory,
  SphericalCelestialObject,
  StarsFactory,
  SunFactory,
  VRRendererFactory,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs';
import { JupiterFactory } from '@shared/threejs/objects3d/space/jupiter/jupiter.factory';
import { MercuryFactory } from '@shared/threejs/objects3d/space/mercury';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private position = 0;

  private dollyCameraParams: DollyCameraParams = {
    fov: 80,
    near: 1,
    far: 8000,
    onVRSessionStartPosition: {
      camera: {
        x: 0,
        y: 0,
        z: 0,
      },
      dolly: {
        x: 0,
        y: 0,
        z: -5,
      },
    },
    onVRSessionEndPosition: {
      camera: {
        x: 0,
        y: 0,
        z: 20,
      },
      dolly: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  };

  constructor(private store: StoreService) {}

  buildScene(container: Container): void {
    this.store.antialias$.subscribe((antialias) => {
      this.onAntialiasChange(container, antialias);
    });
  }

  private onAntialiasChange(container: Container, antialias: boolean) {
    container.empty();
    const position = 0;

    const scene = new StarsFactory(this.store).create();
    const dolly = new DollyCameraFactory(container).create(
      this.dollyCameraParams
    );
    scene.add(dolly);

    const renderer = new VRRendererFactory(container).create(scene, dolly, {
      antialias,
    });
    const loop = new LoopManager(renderer);
    const resize = new WindowResizeManager(container, dolly, renderer);
    const session = new VRSessionManager(renderer);
    session.add(dolly);

    const controls = new ControlsFactory(loop).create(dolly, renderer);

    const sun = new SunFactory(this.store).create();
    scene.add(sun);

    const mercury = new MercuryFactory(this.store, loop).create();
    this.nextPosition(mercury, RadiusRatioEarth.Mercury, 0);
    scene.add(mercury);

    const earth = new EarthFactory(this.store, loop).create();
    scene.add(earth);
    this.nextPosition(earth, RadiusRatioEarth.Earth, RadiusRatioEarth.Mercury);

    const jupiter = new JupiterFactory(this.store, loop).create();
    this.nextPosition(
      jupiter,
      RadiusRatioEarth.Jupiter,
      RadiusRatioEarth.Earth
    );
    scene.add(jupiter);

    const mars = new MarsFactory(this.store, loop).create();
    this.nextPosition(mars, RadiusRatioEarth.Mars, RadiusRatioEarth.Jupiter);
    scene.add(mars);

    const saturn = new SaturnFactory(this.store, loop).create();
    this.nextPosition(saturn, RadiusRatioEarth.Saturn, RadiusRatioEarth.Mars);
    scene.add(saturn);

    const neptune = new NeptuneFactory(this.store, loop).create();
    this.nextPosition(
      neptune,
      RadiusRatioEarth.Neptune,
      RadiusRatioEarth.Saturn
    );
    scene.add(neptune);

    loop.start();
    resize.start();
    session.start();
  }

  private nextPosition(
    planet: SphericalCelestialObject,
    currentPlanetRadius: number,
    previousPlanetRadius: number
  ): number {
    this.position =
      this.position + currentPlanetRadius + previousPlanetRadius + 0.5;
    planet.position.set(0, 0, this.position);

    return this.position;
  }
}
