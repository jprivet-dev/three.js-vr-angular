import { Injectable } from '@angular/core';
import { AppFacade } from '@core/store/app.facade';
import { Container } from '@shared/container';
import { BuildUpdateScene } from '@shared/models';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { OrbitControlsUpdater } from '@shared/threejs/controls';
import { SunLight } from '@shared/threejs/lights';
import {
  LoopManager,
  TextureManager,
  VRSessionManager,
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
import {
  VRControllerLeft,
  VRControllerRight,
} from '@shared/threejs/xr/controllers';
import { Subscription } from 'rxjs';
import { PlanetsFacade } from '../store/planets.facade';
import { planetsDollyCameraParams } from './planets.params';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService implements BuildUpdateScene {
  private subscription = new Subscription();

  private dollyCameraParams: DollyCameraParams = planetsDollyCameraParams;

  private controls!: OrbitControlsUpdater;
  private animate: () => void = () => {};
  private completed = false;

  constructor(private app: AppFacade, private facade: PlanetsFacade) {}

  buildScene(container: Container) {
    if (this.completed) {
      this.update(container);
    } else {
      this.create(container);
      this.completed = true;
    }
  }

  create(container: Container) {
    /**
     * Managers
     */

    const vr = new VRSessionManager();
    const texture = new TextureManager();
    const loop = new LoopManager();

    /**
     * Container
     */

    loop.add(container);

    /**
     * Scene
     */

    const stars = new StarsScene();
    texture.add(stars);
    const scene = stars.scene;

    /**
     * Camera
     */

    this.dollyCameraParams.aspect = container.ratio();
    const dolly = new DollyCamera(this.dollyCameraParams);
    container.resizeAdd(dolly);
    scene.add(dolly);
    vr.add(dolly);

    /**
     * Lights
     */

    const sun = new SunLight();
    scene.add(sun.light);
    texture.add(sun);

    /**
     * Objects of the scene
     */

    const mercury = new Mercury();
    mercury.mesh.position.set(1.5, -2, 4);
    scene.add(mercury.mesh);
    texture.add(mercury);
    loop.add(mercury);

    const venus = new Venus();
    venus.mesh.position.set(-1.5, -2, 4);
    scene.add(venus.mesh);
    texture.add(venus);
    loop.add(venus);

    const earth = new Earth();
    earth.mesh.position.set(1.5, 0, 0);
    scene.add(earth.mesh);
    texture.add(earth);
    loop.add(earth);

    const moon = new Moon();
    moon.mesh.position.set(earth.mesh.position.x + 2, 0, earth.mesh.position.z);
    scene.add(moon.mesh);
    texture.add(moon);
    loop.add(moon);

    const mars = new Mars();
    mars.mesh.position.set(-1.5, 0, 0);
    scene.add(mars.mesh);
    texture.add(mars);
    loop.add(mars);

    const jupiter = new Jupiter();
    jupiter.mesh.position.set(-17, 0, 0);
    scene.add(jupiter.mesh);
    texture.add(jupiter);
    loop.add(jupiter);

    const saturn = new Saturn();
    saturn.mesh.position.set(17, 0, 0);
    scene.add(saturn.mesh);
    texture.add(saturn);
    loop.add(saturn);

    const uranus = new Uranus();
    uranus.mesh.position.set(-5, 3, -13);
    scene.add(uranus.mesh);
    texture.add(uranus);
    loop.add(uranus);

    const neptune = new Neptune();
    neptune.mesh.position.set(5, 5, -13);
    scene.add(neptune.mesh);
    texture.add(neptune);
    loop.add(neptune);

    /**
     * Controls
     */

    this.controls = new OrbitControlsUpdater(
      dolly.camera,
      container.renderer.domElement,
      {
        autoRotateSpeed: 0.2,
        autoRotate: true,
        target: earth.mesh.position,
      }
    );

    loop.add(this.controls);

    /**
     * VR Controllers
     */

    if (container.vrSession) {
      const vrControllerRight = new VRControllerRight(container);

      scene.add(vrControllerRight.controller);
      scene.add(vrControllerRight.controllerGrip);

      const vrControllerLeft = new VRControllerLeft(container);

      scene.add(vrControllerLeft.controller);
      scene.add(vrControllerLeft.controllerGrip);
    }

    /**
     * Subscription
     */

    this.subscription.add(
      this.app.definition$.subscribe((definition) => {
        texture.loadTexturesByDefinition(definition);
      })
    );

    this.subscription.add(
      this.facade.vrSession$.subscribe((vrSession) => {
        vrSession ? vr.onSessionStart() : vr.onSessionEnd();
      })
    );

    /**
     * Animate
     */

    this.animate = () => {
      container.renderer.setAnimationLoop(() => {
        loop.update();
        container.renderer.render(scene, dolly.camera);
      });
    };

    this.animate();
  }

  update(container: Container): void {
    this.animate();
    this.controls.updateDomElement(container.renderer.domElement);
  }

  private createVRControllers(container: Container) {

  }

  unsubscribe(): void {
    this.completed = false;
    this.subscription.unsubscribe();
    // Force the initialization
    this.subscription = new Subscription();
  }
}
