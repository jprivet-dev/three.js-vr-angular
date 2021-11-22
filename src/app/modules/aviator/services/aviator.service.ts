import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
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
  BoxGeometry,
  CylinderGeometry,
  DirectionalLight,
  Fog,
  HemisphereLight,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  Scene,
} from 'three';
import { AviatorColors } from '../models/aviator-colors.model';
import { AviatorFacade } from '../store/aviator.facade';
import { aviatorDollyCameraParams } from './aviator.params';

/**
 * https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
 */
@Injectable({
  providedIn: 'root',
})
export class AviatorService {
  private dollyCameraParams: DollyCameraParams = aviatorDollyCameraParams;
  private subscription = new Subscription();

  private renderer!: Renderer;
  private controls!: OrbitControlsUpdater;
  private controlsActive: boolean = true;

  constructor(private store: StoreService, private facade: AviatorFacade) {}

  buildScene(container: Container, renderer: Renderer) {
    this.renderer = renderer;

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
      scene.add(shadowLight);
    };

    createLights();

    /**
     * Sea
     */

    class Sea implements Loop {
      mesh: Mesh;

      constructor() {
        const geom = new CylinderGeometry(600, 600, 800, 40, 10);
        geom.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2));

        const mat = new MeshPhongMaterial({
          color: AviatorColors.blue,
          transparent: true,
          opacity: 0.6,
          flatShading: true,
        });

        this.mesh = new Mesh(geom, mat);
        this.mesh.receiveShadow = true;
      }

      update(delta: number) {
        this.mesh.rotation.z += .005;
      }
    }

    const createSea = () => {
      const sea = new Sea();
      sea.mesh.position.y = -600;
      scene.add(sea.mesh);
      loop.add(sea);
    };

    createSea();

    /**
     * AirPlane
     */

    class AirPlane implements Loop {
      mesh: Object3D;
      propeller: Mesh;

      constructor() {
        this.mesh = new Object3D();

        // Create the cabin
        const geomCockpit = new BoxGeometry(60, 50, 50, 1, 1, 1);
        const matCockpit = new MeshPhongMaterial({
          color: AviatorColors.red,
          flatShading: true,
        });
        const cockpit = new Mesh(geomCockpit, matCockpit);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        this.mesh.add(cockpit);

        // Create the engine
        const geomEngine = new BoxGeometry(20, 50, 50, 1, 1, 1);
        const matEngine = new MeshPhongMaterial({
          color: AviatorColors.white,
          flatShading: true,
        });
        const engine = new Mesh(geomEngine, matEngine);
        engine.position.x = 40;
        engine.castShadow = true;
        engine.receiveShadow = true;
        this.mesh.add(engine);

        // Create the tail
        const geomTailPlane = new BoxGeometry(15, 20, 5, 1, 1, 1);
        const matTailPlane = new MeshPhongMaterial({
          color: AviatorColors.red,
          flatShading: true,
        });
        const tailPlane = new Mesh(geomTailPlane, matTailPlane);
        tailPlane.position.set(-35, 25, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;
        this.mesh.add(tailPlane);

        // Create the wing
        const geomSideWing = new BoxGeometry(40, 8, 150, 1, 1, 1);
        const matSideWing = new MeshPhongMaterial({
          color: AviatorColors.red,
          flatShading: true,
        });
        const sideWing = new Mesh(geomSideWing, matSideWing);
        sideWing.castShadow = true;
        sideWing.receiveShadow = true;
        this.mesh.add(sideWing);

        // propeller
        const geomPropeller = new BoxGeometry(20, 10, 10, 1, 1, 1);
        const matPropeller = new MeshPhongMaterial({
          color: AviatorColors.brown,
          flatShading: true,
        });
        this.propeller = new Mesh(geomPropeller, matPropeller);
        this.propeller.castShadow = true;
        this.propeller.receiveShadow = true;

        // blades
        const geomBlade = new BoxGeometry(1, 100, 20, 1, 1, 1);
        const matBlade = new MeshPhongMaterial({
          color: AviatorColors.brownDark,
          flatShading: true,
        });

        const blade = new Mesh(geomBlade, matBlade);
        blade.position.set(8, 0, 0);
        blade.castShadow = true;
        blade.receiveShadow = true;
        this.propeller.add(blade);
        this.propeller.position.set(50, 0, 0);
        this.mesh.add(this.propeller);
      }

      update(delta: number) {
        this.propeller.rotation.x += 0.3;
      }
    }

    const createAirPlane = () => {
      const airplane = new AirPlane();
      airplane.mesh.scale.set(0.25, 0.25, 0.25);
      airplane.mesh.position.y = 100;
      scene.add(airplane.mesh);
      loop.add(airplane);

      return airplane;
    };

    const airplane = createAirPlane();

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

  updateRenderer(renderer: Renderer): void {
    this.renderer = renderer;
    if (this.controlsActive) {
      this.controls.updateDomElement(this.renderer.domElement);
    }
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
  }
}
