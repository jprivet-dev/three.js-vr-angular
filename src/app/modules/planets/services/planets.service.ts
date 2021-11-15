import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import {
  DollyCamera,
  DollyCameraAnimation,
  DollyCameraParams,
} from '@shared/threejs/cameras';
import { Container } from '@shared/threejs/containers';
import { SwitchControls, VRControllerFactory } from '@shared/threejs/controls';
import { FlyControlsManager } from '@shared/threejs/controls/fly';
import { SunLight } from '@shared/threejs/lights';
import {
  LoopManager,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs/managers';
import {
  Earth,
  Jupiter,
  Mars,
  Mercury,
  Moon,
  Neptune,
  Saturn,
  Uranus,
  Venus,
} from '@shared/threejs/objects3d';
import { VRRenderer } from '@shared/threejs/renderers';
import { StarsScene } from '@shared/threejs/scenes';
import { planetsDollyCameraParams } from './planets.params';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private dollyCameraParams: DollyCameraParams = planetsDollyCameraParams;
  private controls!: SwitchControls;

  constructor(private store: StoreService) {}

  buildScene(container: Container): void {
    this.store.antialias$.subscribe((antialias) => {
      this.onAntialiasChange(container, antialias);
    });
  }

  switchControl(event: any) {
    this.controls.pointer.lock();
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

    const vrControllerFactory = new VRControllerFactory(
      this.store,
      scene,
      renderer
    );
    const controllerRight = vrControllerFactory.createRight();
    // const controllerLeft = vrControllerFactory.createLeft();

    const dollyAnimation = new DollyCameraAnimation(dolly, renderer);
    loop.add(dollyAnimation);

    this.store.vrControllerRightIsSelecting$.subscribe((isSelecting) => {
      if(isSelecting) {
        dollyAnimation.moveSwitch();
      }
    });

    // this.store.vrControllerLeftIsSelecting$.subscribe((isSelecting) => {
    //   isSelecting ? dollyAnimation.moveBackward() :  dollyAnimation.stop();
    // });

    const sun = new SunLight(this.store);
    scene.add(sun.light);

    const mercury = new Mercury(this.store);
    mercury.mesh.position.set(1.5, -2, 4);
    scene.add(mercury.mesh);
    loop.add(mercury);

    const venus = new Venus(this.store);
    venus.mesh.position.set(-1.5, -2, 4);
    scene.add(venus.mesh);
    loop.add(venus);

    const earth = new Earth(this.store);
    earth.mesh.position.set(1.5, 0, 0);
    scene.add(earth.mesh);
    loop.add(earth);

    const moon = new Moon(this.store);
    moon.mesh.position.set(earth.mesh.position.x + 2, 0, earth.mesh.position.z);
    scene.add(moon.mesh);
    loop.add(moon);

    const mars = new Mars(this.store);
    mars.mesh.position.set(-1.5, 0, 0);
    scene.add(mars.mesh);
    loop.add(mars);

    const jupiter = new Jupiter(this.store);
    jupiter.mesh.position.set(-17, 0, 0);
    scene.add(jupiter.mesh);
    loop.add(jupiter);

    const saturn = new Saturn(this.store);
    saturn.mesh.position.set(17, 0, 0);
    scene.add(saturn.mesh);
    loop.add(saturn);

    const uranus = new Uranus(this.store);
    uranus.mesh.position.set(-5, 3, -13);
    scene.add(uranus.mesh);
    loop.add(uranus);

    const neptune = new Neptune(this.store);
    neptune.mesh.position.set(5, 5, -13);
    scene.add(neptune.mesh);
    loop.add(neptune);

    // this.controls = new SwitchControls(dolly.camera, renderer.domElement);
    // loop.add(this.controls);

    const controls = new FlyControlsManager(dolly, renderer);
    controls.orbit.target = earth.mesh.position;

    loop.add(controls);

    loop.start();
    resize.start();
  }
}
