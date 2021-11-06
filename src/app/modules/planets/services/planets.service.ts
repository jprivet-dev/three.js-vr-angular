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
  MarsFactory, SaturnFactory,
  StarsFactory,
  SunFactory,
  VRRendererFactory,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs';
import { JupiterFactory } from '@shared/threejs/objects3d/space/jupiter/jupiter.factory';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
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

    const planetPosition = {
      jupiter: RadiusRatioEarth.Earth + 0.5 + RadiusRatioEarth.Jupiter,
      mars: -(RadiusRatioEarth.Earth + 1 * RadiusRatioEarth.Mars + 1 * 0.5),
      saturn: -(
        RadiusRatioEarth.Earth +
        2 * RadiusRatioEarth.Mars +
        RadiusRatioEarth.Saturn +
        2 * 0.5
      ),
      neptune: -(
        RadiusRatioEarth.Earth +
        2 * RadiusRatioEarth.Mars +
        2 * RadiusRatioEarth.Saturn +
        RadiusRatioEarth.Neptune +
        3 * 0.5
      ),
    };

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

    const earth = new EarthFactory(this.store, loop).create();
    scene.add(earth);

    const jupiter = new JupiterFactory(this.store, loop).create();
    jupiter.position.set(planetPosition.jupiter, 0, 0);
    scene.add(jupiter);

    const mars = new MarsFactory(this.store, loop).create();
    mars.position.set(planetPosition.mars, 0, 0);
    scene.add(mars);

    const saturn = new SaturnFactory(this.store, loop).create();
    saturn.position.set(planetPosition.saturn, 0, 0);
    scene.add(saturn);

    // const neptune = new NeptuneFactory(this.store).create();
    // neptune.position.set(planetPosition.neptune, 0, 0);
    // scene.add(neptune);
    // loop.add(neptune);

    loop.start();
    resize.start();
    session.start();
  }
}
