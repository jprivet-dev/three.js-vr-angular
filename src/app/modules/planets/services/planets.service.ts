import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { RadiusRatioEarth } from '@shared/constants';
import {
  Container,
  ControlsFactory,
  DollyCameraFactory,
  DollyCameraParams,
  EarthFactory,
  JupiterFactory,
  LoopManager,
  MarsFactory,
  MercuryFactory,
  NeptuneFactory,
  SaturnFactory,
  SphericalCelestialObject,
  StarsFactory,
  SunFactory,
  UranusFactory,
  VenusFactory,
  VRRendererFactory,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private positionStep = 1;
  private position = -30;

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

  constructor(private store: StoreService) {
    this.position;
  }

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

    const venus = new VenusFactory(this.store, loop).create();
    this.nextPosition(venus, RadiusRatioEarth.Venus, RadiusRatioEarth.Mercury);
    scene.add(venus);

    const earth = new EarthFactory(this.store, loop).create();
    scene.add(earth);
    this.nextPosition(earth, RadiusRatioEarth.Earth, RadiusRatioEarth.Venus);

    const mars = new MarsFactory(this.store, loop).create();
    this.nextPosition(mars, RadiusRatioEarth.Mars, RadiusRatioEarth.Earth);
    scene.add(mars);

    const jupiter = new JupiterFactory(this.store, loop).create();
    this.nextPosition(jupiter, RadiusRatioEarth.Jupiter, RadiusRatioEarth.Mars);
    scene.add(jupiter);

    const saturn = new SaturnFactory(this.store, loop).create();
    this.nextPosition(
      saturn,
      RadiusRatioEarth.Saturn,
      RadiusRatioEarth.Jupiter
    );
    scene.add(saturn);

    const uranus = new UranusFactory(this.store, loop).create();
    this.nextPosition(uranus, RadiusRatioEarth.Uranus, RadiusRatioEarth.Saturn);
    scene.add(uranus);

    const neptune = new NeptuneFactory(this.store, loop).create();
    this.nextPosition(
      neptune,
      RadiusRatioEarth.Neptune,
      RadiusRatioEarth.Uranus
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
      this.position + currentPlanetRadius + previousPlanetRadius + this.positionStep;
    planet.position.set(0, 0, this.position);

    return this.position;
  }
}
