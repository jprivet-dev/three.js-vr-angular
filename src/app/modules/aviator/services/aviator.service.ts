import { Injectable } from '@angular/core';
import { Container } from '@shared/container';
import { BuildUpdateScene } from '@shared/models';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { OrbitControlsUpdater } from '@shared/threejs/controls';
import { LoopManager } from '@shared/threejs/managers';
import { VRSessionManager } from '@shared/threejs/xr/session';
import { angleXZ } from '@shared/utils';
import { Subscription } from 'rxjs';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  DoubleSide,
  Fog,
  HemisphereLight,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Object3D,
  PlaneGeometry,
  Scene,
  Vector3,
} from 'three';
import {
  RollerCoasterGeometry,
  TreesGeometry,
} from 'three/examples/jsm/misc/RollerCoaster';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { AviatorFacade } from '../store/aviator.facade';
import { RollerCoasterCurve } from '../threejs';
import { RollerCoasterCurveProgress } from '../threejs/curves/roller-coaster-curve-progress';
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
  private subscription = new Subscription();
  private dollyCameraParams: DollyCameraParams = aviatorDollyCameraParams;

  private controlsActive: boolean = false;
  private controlsUpdate: (container: Container) => void = () => {};
  private animate: (container: Container) => void = () => {};

  private completed = false;

  constructor(private facade: AviatorFacade) {}

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
    const loop = new LoopManager();

    /**
     * Container
     */

    loop.add(container);

    /**
     * Scene
     */

    const scene = new Scene();
    scene.fog = new Fog(0xf7d9aa, 0.1, 500);
    scene.background = new Color(0xf7d9aa);

    /**
     * Camera
     */

    this.dollyCameraParams.aspect = container.ratio();
    const dolly = new DollyCamera(this.dollyCameraParams);
    vr.add(dolly);
    container.resizeAdd(dolly);

    const train = new Object3D();
    train.add(dolly);
    scene.add(train);

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
     * Ground
     */

    const createGround = (): void => {
      const geometry = new PlaneGeometry(500, 500, 15, 15);
      geometry.rotateX(-Math.PI / 2);

      const positions = geometry.getAttribute('position').array;
      const vertex = new Vector3();

      for (let i = 0; i < positions.length; i += 3) {
        vertex.fromArray(positions, i);

        vertex.x += Math.random() * 10 - 5;
        vertex.z += Math.random() * 10 - 5;

        const distance = vertex.distanceTo(scene.position) / 5 - 25;
        vertex.y = Math.random() * Math.max(0, distance);

        vertex.toArray(positions, i);
      }

      geometry.computeVertexNormals();

      const material = new MeshLambertMaterial({
        color: 0x407000,
      });

      const mesh = new Mesh(geometry, material);
      scene.add(mesh);

      const geometryTrees = new TreesGeometry(mesh);
      const materialTrees = new MeshBasicMaterial({
        side: DoubleSide,
        vertexColors: true,
      });
      const meshTrees = new Mesh(geometryTrees, materialTrees);
      scene.add(meshTrees);
    };

    createGround();

    /**
     * AirPlane
     */

    const airplane = new AirPlane();
    const airplaneScale = 0.01;
    airplane.mesh.scale.set(airplaneScale, airplaneScale, airplaneScale);
    train.add(airplane.mesh);
    loop.add(airplane);

    /**
     * Curve
     */

    const curve = new RollerCoasterCurve(50);
    const curveProgress = new RollerCoasterCurveProgress(
      curve, dolly, train, airplane.mesh
    )

    loop.add(curveProgress);

    const createRollerCoaster = () => {
      const geometry = new RollerCoasterGeometry(curve, 1500);
      const material = new MeshPhongMaterial({
        vertexColors: true,
      });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
    };

    //createRollerCoaster();

    /**
     * Global Animation
     */

    loop.add({
      update: (delta: number) => {
      },
    });

    /**
     * Controls
     */

    if (this.controlsActive) {
      const controls = new OrbitControlsUpdater(
        dolly.camera,
        container.renderer.domElement,
        {
          autoRotateSpeed: 0.2,
          autoRotate: true,
          target: airplane.mesh.position.clone(),
        }
      );

      loop.add(controls);

      this.controlsUpdate = (container: Container) => {
        controls.updateDomElement(container.renderer.domElement);
      };
    }

    /**
     * VR Session
     */

    this.subscription = this.facade.vrSession$.subscribe((vrSession) => {
      vrSession ? vr.onSessionStart() : vr.onSessionEnd();
    });

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
    if (this.controlsActive) {
      this.controlsUpdate(container);
    }

    this.animate(container);
  }

  unsubscribe(): void {
    this.completed = false;
    this.subscription.unsubscribe();
    // Force the initialization
    this.subscription = new Subscription();
  }
}
