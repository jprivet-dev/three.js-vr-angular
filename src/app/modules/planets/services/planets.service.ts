import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import {
  DollyCamera,
  DollyCameraAnimation,
  DollyCameraParams,
} from '@shared/threejs/cameras';
import { Container } from '@shared/threejs/containers';
import { SwitchControls, VRControllerFactory } from '@shared/threejs/controls';
import { SunLight } from '@shared/threejs/lights';
import {
  LoopManager,
  TextureManager,
  VRRendererBuilder,
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
import { StarsScene } from '@shared/threejs/scenes';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PlanetsFacade } from '../store/planets.facade';
import { planetsDollyCameraParams } from './planets.params';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private dollyCameraParams: DollyCameraParams = planetsDollyCameraParams;
  private controls!: SwitchControls;

  constructor(private store: StoreService, private facade: PlanetsFacade) {}

  buildScene(container: Container): void {
    const resize = new WindowResizeManager(container);
    const rendererBuilder = new VRRendererBuilder(container);
    const loop = new LoopManager();
    const texture = new TextureManager();
    const scene = new StarsScene(this.store).scene;

    const dolly = new DollyCamera(container, this.dollyCameraParams);
    scene.add(dolly);
    resize.add(dolly);

    let lastAntialias = false;
    let renderer = rendererBuilder.build({ antialias: lastAntialias });
    resize.add(renderer);

    this.store.isAntialias$.subscribe((antialias) => {
      if (lastAntialias === antialias) return;
      renderer = rendererBuilder.build({ antialias });
      resize.add(renderer);
      lastAntialias = antialias;
    });

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
      if (isSelecting) {
        dollyAnimation.moveSwitch();
      }
    });

    // this.store.vrControllerLeftIsSelecting$.subscribe((isSelecting) => {
    //   isSelecting ? dollyAnimation.moveBackward() :  dollyAnimation.stop();
    // });

    const sun = new SunLight(this.store);
    scene.add(sun.light);

    const mercury = new Mercury();
    mercury.mesh.position.set(1.5, -2, 4);
    scene.add(mercury.mesh);
    loop.add(mercury);
    texture.add(mercury);

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

    // const controls = new FlyControlsManager(container, dolly);
    //
    // this.store.isFlyMode$.subscribe((state) => {
    //   state ? controls.pointer.enable() : controls.pointer.disable();
    // });
    //
    // controls.pointer.isLocked$.subscribe((isLocked) => {
    //   if (!isLocked) {
    //     this.store.flyModeOff();
    //   }
    // });
    // controls.orbit.target = earth.mesh.position;
    //loop.add(controls);

    const controls = new OrbitControls(dolly.camera, renderer.domElement);
    controls.autoRotateSpeed = 0.2;
    controls.autoRotate = true;
    controls.enableDamping = true;
    controls.target = earth.mesh.position;
    loop.add(controls);

    this.facade.definition$.subscribe((definition) =>
      texture.loadTextureByDefinition(definition)
    );

    renderer.setAnimationLoop(() => {
      loop.update();
      renderer.render(scene, dolly.camera);
    });
  }
}
