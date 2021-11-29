import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { ContainerEvent } from '@shared/container/container.model';
import { BuildUpdateScene } from '@shared/models';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { OrbitControlsUpdater } from '@shared/threejs/controls';
import {
  AnimationManager,
  LoopManager,
  VRSessionManager,
} from '@shared/threejs/managers';
import { Loop } from '@shared/threejs/models';
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

  private animationManager!: AnimationManager;
  private controls!: OrbitControlsUpdater;
  private controlsActive: boolean = false;

  constructor(private store: StoreService, private facade: AviatorFacade) {}

  buildScene({ container }: ContainerEvent) {
    /**
     * Managers
     */

    const vr = new VRSessionManager();
    const loop = new LoopManager();

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
     * Container
     */

    loop.add(container);

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

    const curve = new RollerCoasterCurve(50);

    const createRollerCoaster = () => {
      const geometry = new RollerCoasterGeometry(curve, 1500);
      const material = new MeshPhongMaterial({
        vertexColors: true,
      });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
    };

    //createRollerCoaster();

    const position = new Vector3();
    const positionOffset = new Vector3();
    const tangent = new Vector3();
    const lookAt = new Vector3();
    let velocity = 0; // 0.00008
    let progress = 0;
    const offset = 0.0001;
    let diffY = 0;
    let currentAngleXZ = 0;
    let lastAngleXZ = 0;
    let diffAngleXZ = 0;

    const progressOnCurve = (airPlane: AirPlane, delta: number) => {
      progress += velocity;
      progress = progress % 1;
      positionOffset.copy(curve.getPointAt(progress - offset));

      diffY = positionOffset.y - position.y;
      currentAngleXZ = angleXZ(position, positionOffset);
      diffAngleXZ = lastAngleXZ - currentAngleXZ;

      position.copy(curve.getPointAt(progress));
      train.position.copy(position);
      airPlane.mesh.rotation.set(
        -diffY * 10,
        diffAngleXZ * 30,
        diffAngleXZ * 110
      );
      airPlane.mesh.position.y = -diffY * 30 + 0.2;
      dolly.rotation.set(0, 0, diffAngleXZ * 20);
      tangent.copy(curve.getTangentAt(progress));

      velocity -= tangent.y * 0.0000001 * delta;
      velocity = Math.max(0.00008, Math.min(0.0002, velocity));

      train.lookAt(lookAt.copy(position).sub(tangent));

      lastAngleXZ = currentAngleXZ;
    };

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
     * Global Animation
     */

    class GlobalAnimation implements Loop {
      update(delta: number) {
        progressOnCurve(airplane, delta);
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
        container.renderer.domElement,
        {
          autoRotateSpeed: 0.2,
          autoRotate: true,
          target: airplane.mesh.position,
        }
      );

      loop.add(this.controls);
    }

    /**
     * Animation Manager
     */

    this.animationManager = new AnimationManager(
      loop,
      container,
      scene,
      dolly.camera
    );
  }

  updateContainer({ renderer }: ContainerEvent): void {
    this.animationManager.updateRenderer(renderer);
    if (this.controlsActive) {
      this.controls.updateDomElement(renderer.domElement);
    }
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
  }
}
