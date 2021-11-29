import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { BuildUpdateScene } from '@shared/models';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { Container } from '@shared/threejs/containers';
import { OrbitControlsUpdater } from '@shared/threejs/controls';
import { SunLight } from '@shared/threejs/lights';
import {
  LoopManager,
  TextureManager,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs/managers';
import { Earth, Moon } from '@shared/threejs/objects3d';
import { StarsScene } from '@shared/threejs/scenes';
import { Subscription } from 'rxjs';
import { EarthFacade } from '../store/earth.facade';
import { earthDollyCameraParams } from './earth.params';

@Injectable({
  providedIn: 'root',
})
export class EarthService implements BuildUpdateScene {
  private dollyCameraParams: DollyCameraParams = earthDollyCameraParams;
  private subscription = new Subscription();

  private controls!: OrbitControlsUpdater;

  constructor(private store: StoreService, private facade: EarthFacade) {}

  buildScene(container: Container) {
    /**
     * Managers
     */

    const vr = new VRSessionManager();
    const resize = new WindowResizeManager(container);
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

    const dolly = new DollyCamera(this.dollyCameraParams);
    scene.add(dolly);
    vr.add(dolly);

    /**
     * Renderer
     */

    // this.rendererManager = new AnimationManager(
    //   loop,
    //   container,
    //   scene,
    //   dolly.camera
    // );

    // resize.add(this.rendererManager);

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
     * Store events
     */

    this.subscription.add(
      this.facade.definition$.subscribe((definition) => {
        texture.loadTexturesByDefinition(definition);
      })
    );

    this.subscription.add(
      this.facade.vrSession$.subscribe((vrSession) => {
        vrSession ? vr.onSessionStart() : vr.onSessionEnd();
      })
    );

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
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
  }
}
