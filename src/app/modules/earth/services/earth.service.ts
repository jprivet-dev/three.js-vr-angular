import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { DollyCameraFactory, DollyCameraParams } from '@shared/threejs/cameras';
import { ControlsFactory } from '@shared/threejs/controls';
import {
  AnimationManager,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs/managers';
import { Container } from '@shared/threejs/models';
import {
  Earth,
  Moon,
  StarsFactory,
  SunFactory,
} from '@shared/threejs/objects3d';
import { VRRendererFactory } from '@shared/threejs/renderers';
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

    const earth = new Earth(this.store);
    scene.add(earth.mesh);
    animation.add(earth);

    const moon = new Moon(this.store);
    moon.mesh.position.set(2, 0, 0);
    scene.add(moon.mesh);
    animation.add(moon);

    animation.start();
    resize.start();
    session.start();
  }
}
