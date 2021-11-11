import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import {
  AnimationManager,
  Container,
  ControlsFactory,
  DollyCameraFactory,
  DollyCameraParams,
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

    const animation = new AnimationManager(renderer);
    const resize = new WindowResizeManager(container, dolly, renderer);
    const session = new VRSessionManager(this.store, renderer);
    session.add(dolly);

    const controls = new ControlsFactory().create(dolly, renderer);
    animation.add(controls);

    const sun = new SunFactory(this.store).create();
    scene.add(sun);

    // const earth = new EarthFactory(this.store, animation).create();
    // scene.add(earth);

    const moon = new MoonFactory(this.store).create();
    moon.position.set(2, 0, 0);
    scene.add(moon);
    animation.add(moon.getAnimation());

    animation.start();
    resize.start();
    session.start();
  }
}
