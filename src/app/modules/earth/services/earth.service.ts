import { Injectable } from '@angular/core';
import { AppFacade } from '@core/store/app.facade';
import { Container } from '@shared/container';
import { BuildUpdateScene } from '@shared/models';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { OrbitUpdaterControls } from '@shared/threejs/controls';
import { SunLight } from '@shared/threejs/lights';
import {
  LoopManager,
  TextureManager,
} from '@shared/threejs/managers';
import { Earth, Moon } from '@shared/threejs/objects3d';
import { StarsScene } from '@shared/threejs/scenes';
import { VRSessionManager } from '@shared/threejs/xr/session';
import { Subscription } from 'rxjs';
import { EarthFacade } from '../store/earth.facade';
import { earthDollyCameraParams } from './earth.params';

@Injectable({
  providedIn: 'root',
})
export class EarthService implements BuildUpdateScene {
  private subscription = new Subscription();
  private dollyCameraParams: DollyCameraParams = earthDollyCameraParams;

  private controlsUpdate: (container: Container) => void = () => {};
  private animate: (container: Container) => void = () => {};

  private completed = false;

  constructor(
    private app: AppFacade,
    private facade: EarthFacade
  ) {}

  buildScene(container: Container): void {
    if (this.completed) {
      this.update(container);
    } else {
      this.create(container);
      this.completed = true;
    }
  }

  create(container: Container): void {
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

    const earth = new Earth();
    scene.add(earth.mesh);
    texture.add(earth);
    loop.add(earth);

    const moon = new Moon();
    moon.mesh.position.set(2, 0, 0);
    scene.add(moon.mesh);
    texture.add(moon);
    loop.add(moon);

    /**
     * Controls
     */

    const controls = new OrbitUpdaterControls(
      dolly.camera,
      container.renderer.domElement,
      {
        autoRotateSpeed: 0.2,
        autoRotate: true,
        target: earth.mesh.position.clone(),
      }
    );

    loop.add(controls);

    this.controlsUpdate = (container: Container) => {
      controls.updateDomElement(container.renderer.domElement);
    };

    /**
     * Textures By Definition
     */

    this.subscription.add(
      this.app.definition$.subscribe((definition) => {
        texture.loadTexturesByDefinition(definition);
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
    this.animate(container);
  }

  unsubscribe(): void {
    this.completed = false;
    this.subscription.unsubscribe();
    // Force the initialization
    this.subscription = new Subscription();
  }
}
