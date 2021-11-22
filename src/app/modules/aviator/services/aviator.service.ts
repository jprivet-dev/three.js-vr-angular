import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { Container } from '@shared/threejs/containers';
import { OrbitControlsUpdater } from '@shared/threejs/controls';
import {
  LoopManager,
  TextureManager,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs/managers';
import { Renderer } from '@shared/threejs/renderers';
import { Subscription } from 'rxjs';
import { Scene } from 'three';
import { AviatorFacade } from '../store/aviator.facade';
import { aviatorDollyCameraParams } from './aviator.params';

@Injectable({
  providedIn: 'root',
})
export class AviatorService {
  private dollyCameraParams: DollyCameraParams = aviatorDollyCameraParams;
  private subscription = new Subscription();

  private renderer!: Renderer;
  private controls!: OrbitControlsUpdater;

  constructor(private store: StoreService, private facade: AviatorFacade) {}

  buildScene(container: Container, renderer: Renderer) {
    this.renderer = renderer;

    /**
     * Managers
     */

    const vr = new VRSessionManager();
    const resize = new WindowResizeManager(container);
    const texture = new TextureManager();
    const loop = new LoopManager();

    /**
     * Scene
     */

    const scene = new Scene();

    /**
     * Camera
     */

    const dolly = new DollyCamera(container, this.dollyCameraParams);
    scene.add(dolly);
    resize.add(dolly);
    vr.add(dolly);

    /**
     * Renderer
     */

    resize.add(this.renderer);

    this.renderer.setAnimationLoop(() => {
      loop.update();
      this.renderer.render(scene, dolly.camera);
    });

    /**
     * Objects of the scene
     */

    // TODO

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
      this.renderer.domElement,
      {
        autoRotateSpeed: 0.2,
        autoRotate: true,
      }
    );

    loop.add(this.controls);
  }

  updateRenderer(renderer: Renderer): void {
    this.renderer = renderer;
    this.controls.updateDomElement(this.renderer.domElement);
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
  }
}
