import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { DollyCameraParams } from '@shared/threejs/cameras';
import { Container } from '@shared/threejs/containers';
import { OrbitControlsUpdater } from '@shared/threejs/controls';
import { Renderer } from '@shared/threejs/renderers';
import { Subscription } from 'rxjs';
import { EarthFacade } from '../store/earth.facade';
import { earthDollyCameraParams } from './earth.params';

@Injectable({
  providedIn: 'root',
})
export class ___EarthService {
  private dollyCameraParams: DollyCameraParams = earthDollyCameraParams;
  private subscription = new Subscription();

  private renderer!: Renderer;
  private controls!: OrbitControlsUpdater;

  constructor(private store: StoreService, private facade: EarthFacade) {}

  buildScene(container: Container, renderer: Renderer) {
    this.renderer = renderer;

    // container.empty();
    //
    // const scene = new StarsScene(this.store).scene;
    // const dolly = new DollyCamera(container, this.dollyCameraParams);
    // scene.add(dolly);
    //
    // const renderer = new VRRenderer(container, scene, dolly.camera, {
    //   antialias,
    // });
    //
    // const loop = new LoopManager(renderer);
    // const resize = new WindowResizeManager(container, dolly, renderer);
    // const vr = new VRSessionManager(this.store, renderer);
    // vr.add(dolly);
    //
    // const sun = new SunLight(this.store);
    // scene.add(sun.light);
    //
    // const earth = new Earth(this.store);
    // scene.add(earth.mesh);
    // loop.add(earth);
    //
    // const moon = new Moon(this.store);
    // moon.mesh.position.set(2, 0, 0);
    // scene.add(moon.mesh);
    // loop.add(moon);
    //
    // const controls = new OrbitControls(dolly.camera, renderer.domElement);
    // controls.autoRotateSpeed = 0.2;
    // controls.autoRotate = true;
    // controls.target = earth.mesh.position;
    // loop.add(controls);
    //
    // loop.start();
    // resize.start();
  }
}
