import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { Container } from '@shared/threejs/containers';
import { SunLight } from '@shared/threejs/lights';
import {
  LoopManager,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs/managers';
import { Earth, Moon } from '@shared/threejs/objects3d';
import { VRRenderer } from '@shared/threejs/renderers';
import { StarsScene } from '@shared/threejs/scenes';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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

    const scene = new StarsScene(this.store).scene;
    const dolly = new DollyCamera(container, this.dollyCameraParams);
    scene.add(dolly);

    const renderer = new VRRenderer(container, scene, dolly.camera, {
      antialias,
    });

    const loop = new LoopManager(renderer);
    const resize = new WindowResizeManager(container, dolly, renderer);
    const vr = new VRSessionManager(this.store, renderer);
    vr.add(dolly);

    const controls = new OrbitControls(dolly.camera, renderer.domElement);
    controls.autoRotateSpeed = 0.2;
    controls.autoRotate = true;
    loop.add(controls);

    const sun = new SunLight(this.store);
    scene.add(sun.light);

    const earth = new Earth(this.store);
    scene.add(earth.mesh);
    loop.add(earth);

    const moon = new Moon(this.store);
    moon.mesh.position.set(2, 0, 0);
    scene.add(moon.mesh);
    loop.add(moon);

    loop.start();
    resize.start();
  }
}
