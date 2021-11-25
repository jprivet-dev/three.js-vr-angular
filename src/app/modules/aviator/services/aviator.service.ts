import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { BuildUpdateScene } from '@shared/models';
import { RendererEvent } from '@shared/renderer/renderer.model';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { Container } from '@shared/threejs/containers';
import { OrbitControlsUpdater } from '@shared/threejs/controls';
import {
  LoopManager,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs/managers';
import { Loop } from '@shared/threejs/models';
import { Renderer } from '@shared/threejs/renderers';
import { Subscription } from 'rxjs';
import {
  AmbientLight,
  DirectionalLight,
  Fog,
  HemisphereLight,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  PlaneGeometry,
  Scene,
  Vector3,
} from 'three';
import { AviatorFacade } from '../store/aviator.facade';
import { RollerCoasterCurve } from '../threejs';
import { AirPlane } from '../threejs/objects3d/airplane';
import { aviatorDollyCameraParams } from './aviator.params';

/**
 * https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
 * https://github.com/yakudoo/TheAviator
 */
@Injectable({
  providedIn: 'root',
})
export class AviatorService implements BuildUpdateScene {
  private dollyCameraParams: DollyCameraParams = aviatorDollyCameraParams;
  private subscription = new Subscription();

  private renderer!: Renderer;
  private controls!: OrbitControlsUpdater;
  private controlsActive: boolean = true;

  constructor(private store: StoreService, private facade: AviatorFacade) {}

  buildScene(event: RendererEvent) {
    const PI2 = Math.PI * 2;

    const container: Container = event.container;
    this.renderer = event.renderer;

    /**
     * Managers
     */

    const vr = new VRSessionManager();
    const resize = new WindowResizeManager(container);
    const loop = new LoopManager();

    /**
     * Scene
     */

    const scene = new Scene();
    scene.fog = new Fog(0xf7d9aa, 100, 950);

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
     * Lights
     */

    const createLights = () => {
      const hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, 0.9);

      const ambientLight = new AmbientLight(0xdc8874, 0.5);

      const shadowLight = new DirectionalLight(0xffffff, 0.9);
      shadowLight.position.set(150, 350, 350);
      shadowLight.castShadow = true;

      // define the visible area of the projected shadow
      shadowLight.shadow.camera.left = -400;
      shadowLight.shadow.camera.right = 400;
      shadowLight.shadow.camera.top = 400;
      shadowLight.shadow.camera.bottom = -400;
      shadowLight.shadow.camera.near = 1;
      shadowLight.shadow.camera.far = 1000;

      // resolution of the shadow
      shadowLight.shadow.mapSize.width = 2048;
      shadowLight.shadow.mapSize.height = 2048;

      scene.add(hemisphereLight);
      scene.add(ambientLight);
      scene.add(shadowLight);
    };

    createLights();

    /**
     * Curve
     */

    const position = new Vector3();
    const tangent = new Vector3();
    const lookAt = new Vector3();
    let velocity = 0;
    let progress = 0;

    const curve = new RollerCoasterCurve(50);

    const progressOnCurve = (object3D: Object3D, delta: number) => {
      progress += velocity;
      progress = progress % 1;

      position.copy(curve.getPointAt(progress));
      position.y += 0.3;

      object3D.position.copy(position);

      tangent.copy(curve.getTangentAt(progress));

      velocity -= tangent.y * 0.0000001 * delta;
      velocity = Math.max(0.00004, Math.min(0.0002, velocity));

      object3D.lookAt(lookAt.copy(position).sub(tangent));
    };

    /**
     * Sea
     */

    // const createSea = () => {
    //   const sea = new Sea();
    //   sea.mesh.position.y = -600;
    //   scene.add(sea.mesh);
    //   loop.add(sea);
    // };
    //
    // createSea();

    /**
     * Ground
     */

    const createGround = (): void => {
      const geometry = new PlaneGeometry(500, 500, 15, 15);
      geometry.rotateX(-Math.PI / 2);

      const material = new MeshLambertMaterial({
        color: 0x407000,
      });

      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
    };

    createGround();

    /**
     * AirPlane
     */

    const airplane = new AirPlane();
    airplane.mesh.scale.set(0.25, 0.25, 0.25);
    airplane.mesh.position.y = 100;
    scene.add(airplane.mesh);
    loop.add(airplane);

    /**
     * Global Animation
     */

    class GlobalAnimation implements Loop {
      update(delta: number) {

      }
    }

    const animation = new GlobalAnimation();
    loop.add(animation);

    /**
     * Store events
     */

    this.subscription.add(
      this.facade.vrSession$.subscribe((vrSession) => {
        vrSession ? vr.onSessionStart() : vr.onSessionEnd();
      })
    );

    /**
     * Controls
     */

    if (this.controlsActive) {
      this.controls = new OrbitControlsUpdater(
        dolly.camera,
        this.renderer.domElement,
        {
          autoRotateSpeed: 0.2,
          autoRotate: true,
          target: airplane.mesh.position,
        }
      );

      loop.add(this.controls);
    }
  }

  updateRenderer(event: RendererEvent): void {
    this.renderer = event.renderer;
    if (this.controlsActive) {
      this.controls.updateDomElement(this.renderer.domElement);
    }
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
  }
}
