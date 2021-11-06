import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import {
  Container,
  Controls,
  DollyCameraFactory,
  DollyCameraParams,
  LoopManager,
  StarsFactory,
  SunFactory,
  VRRendererFactory,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs';

@Injectable({
  providedIn: 'root',
})
export class EarthService {
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
        x: -2.5,
        y: 0,
        z: 0,
      },
    },
    onVRSessionEndPosition: {
      camera: {
        x: 0,
        y: 0,
        z: 5,
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

    const controls = new Controls(dolly, renderer);
    controls.enableAutoRotate();
    // loop.add(controls);

    const sun = new SunFactory(this.store).create();
    scene.add(sun);

    // const earth = new EarthFactory(this.store).create();
    // scene.add(earth);
    // loop.add(earth);
    //
    // const clouds = new CloudsFactory(this.store).create();
    // earth.add(clouds);
    // loop.add(clouds);

    loop.start();
    resize.start();
    session.start();
  }
}
