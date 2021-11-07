import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import {
  Container,
  Controls, ControlsFactory,
  DollyCameraFactory,
  DollyCameraParams,
  EarthFactory,
  LoopManager,
  MoonFactory,
  StarsFactory,
  SunFactory,
  VRRendererFactory,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs';
import { earthDollyCameraParams } from './earth.params';

@Injectable({
  providedIn: 'root',
})
export class EarthService {
  private dollyCameraParams: DollyCameraParams = earthDollyCameraParams;

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

    const controls = new ControlsFactory(loop).create(dolly, renderer);

    const sun = new SunFactory(this.store).create();
    scene.add(sun);

    const earth = new EarthFactory(this.store, loop).create();
    scene.add(earth);

    const moon = new MoonFactory(this.store, loop).create();
    moon.position.set(2, 0, 0);
    scene.add(moon);

    loop.start();
    resize.start();
    session.start();
  }
}
