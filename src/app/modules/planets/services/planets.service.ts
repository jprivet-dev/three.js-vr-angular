import { Injectable } from '@angular/core';
import { AppFacade } from '@core/store/app.facade';
import { Container } from '@shared/container';
import { BuildUpdateScene } from '@shared/models';
import {
  DollyCamera,
  DollyCameraFlyAnimation,
  DollyCameraParams,
  DollyCameraXRAnimation,
} from '@shared/threejs/cameras';
import { OrbitUpdaterControls } from '@shared/threejs/controls';
import { SunLight } from '@shared/threejs/lights';
import { LoopManager, TextureManager } from '@shared/threejs/managers';
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
import { VRSessionManager } from '@shared/threejs/xr/session';
import { Subscription } from 'rxjs';
import { PlanetsActions } from '../store/actions';
import { PlanetsFacade } from '../store/planets.facade';
import { planetsDollyCameraParams } from './planets.params';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService implements BuildUpdateScene {
  private subscription = new Subscription();
  private dollyCameraParams: DollyCameraParams = planetsDollyCameraParams;

  private controlsUpdate: (container: Container) => void = () => {};
  private vrControllersUpdate: (container: Container) => void = () => {};
  private animate: (container: Container) => void = () => {};

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
     * Textures By Definition
     */

    this.subscription.add(
      this.app.definition$.subscribe((definition) => {
        texture.loadTexturesByDefinition(definition);
      })
    );

    /**
     * Orbit Controls
     */

    const orbitControls = new OrbitUpdaterControls(
      dolly.camera,
      container.renderer.domElement,
      {
        autoRotateSpeed: 0.2,
        autoRotate: true,
        target: earth.mesh.position.clone(),
      }
    );

    loop.add(orbitControls);

    this.controlsUpdate = (container: Container) => {
      orbitControls.updateDomElement(container.renderer.domElement);
    };

    /**
     * Fly Controls
     */

    const flyAnimation = new DollyCameraFlyAnimation(dolly, container);
    loop.add(flyAnimation);

    flyAnimation.pointerLock.onLock(() => {
      orbitControls.disable();
    });

    flyAnimation.pointerLock.onUnlock(() => {
      orbitControls.enable();
      this.facade.dispatch(PlanetsActions.flyModeOff());
    });

    this.subscription.add(
      this.facade.flyMode$.subscribe((flyMode) => {
        flyMode ? flyAnimation.start() : flyAnimation.stop();
      })
    );

    /**
     * VR Session
     */

    this.subscription.add(
      this.facade.vrSession$.subscribe((vrSession) => {
        vrSession ? vr.onSessionStart() : vr.onSessionEnd();
      })
    );

    /**
     * VR Controllers
     */

    if (container.vrSession) {
      // Controllers

      const vrControllerRight = new VRControllerRight(container, 5);
      scene.add(vrControllerRight.controller);
      scene.add(vrControllerRight.grip);

      const vrControllerLeft = new VRControllerLeft(container, 5);
      scene.add(vrControllerLeft.controller);
      scene.add(vrControllerLeft.grip);

      // DollyCameraXRAnimation

      const dollyCameraXRAnimation = new DollyCameraXRAnimation(
        dolly,
        container
      );
      loop.add(dollyCameraXRAnimation);

      vrControllerRight.onSelectStart(() => {
        dollyCameraXRAnimation.moveSwitch();
      });

      vrControllerLeft.onSelectStart(() => {
        dollyCameraXRAnimation.moveSwitch();
      });

      this.vrControllersUpdate = (container) => {
        scene.remove(
          vrControllerRight.controller,
          vrControllerRight.grip,
          vrControllerLeft.controller,
          vrControllerLeft.grip
        );

        vrControllerRight.updateContainer(container);
        scene.add(vrControllerRight.controller);
        scene.add(vrControllerRight.grip);

        vrControllerLeft.updateContainer(container);
        scene.add(vrControllerLeft.controller);
        scene.add(vrControllerLeft.grip);
      };
    }

    /**
     * Animate
     */

    this.animate = (container: Container) => {
      container.renderer.setAnimationLoop(() => {
        loop.update();
        container.renderer.render(scene, dolly.camera);
      });
    };

    this.animate(container);
  }

  update(container: Container): void {
    this.controlsUpdate(container);
    this.vrControllersUpdate(container);
    this.animate(container);
  }

  unsubscribe(): void {
    this.completed = false;
    this.subscription.unsubscribe();
    // Force the initialization
    this.subscription = new Subscription();
  }
}
