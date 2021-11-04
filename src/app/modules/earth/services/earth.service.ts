import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import {
  CloudsFactory,
  Container,
  Controls,
  DollyCameraFactory,
  EarthFactory,
  LoopManager,
  StarsFactory,
  SunFactory,
  SunLensflareFactory,
  VRRendererFactory,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs';

@Injectable({
  providedIn: 'root',
})
export class EarthService {
  constructor(private store: StoreService) {}

  buildScene(container: Container): void {
    this.store.antialias$.subscribe((antialias) => {
      this.onAntialiasChange(container, antialias);
    });
  }

  private onAntialiasChange(container: Container, antialias: boolean) {
    container.empty();

    const scene = new StarsFactory(this.store).create();
    const dolly = new DollyCameraFactory(container).create();
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
    loop.add(controls);

    const sun = new SunFactory().create();
    scene.add(sun);

    const lensflare = new SunLensflareFactory(this.store).create();
    sun.add(lensflare);

    const earth = new EarthFactory(this.store).create();
    scene.add(earth);
    loop.add(earth);

    const clouds = new CloudsFactory(this.store).create();
    earth.add(clouds);
    loop.add(clouds);

    loop.start();
    resize.start();
    session.start();
  }
}
