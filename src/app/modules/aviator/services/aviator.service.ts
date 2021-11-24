import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { BuildUpdateScene } from '@shared/models';
import { RendererEvent } from '@shared/renderer/renderer.model';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { Container } from '@shared/threejs/containers';
import { OrbitControlsUpdater } from '@shared/threejs/controls';
import { LoopManager, VRSessionManager, WindowResizeManager, } from '@shared/threejs/managers';
import { Loop } from '@shared/threejs/models';
import { Renderer } from '@shared/threejs/renderers';
import { applyOffsetXYZAs } from '@shared/utils';
import { Subscription } from 'rxjs';
import {
  AmbientLight,
  BoxGeometry,
  CylinderGeometry,
  DirectionalLight,
  Fog,
  HemisphereLight,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Object3D,
  Scene,
} from 'three';
import { AviatorColors } from '../models/aviator-colors.model';
import { AviatorFacade } from '../store/aviator.facade';
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
        this.mesh.rotation.z += 0.005;
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
     * Pilot
     */

    class Pilot implements Loop {
      mesh: Object3D;
      hairsTop: Object3D;
      angleHairs: number;

      constructor() {
        this.mesh = new Object3D();
        this.mesh.name = 'pilot';
        this.angleHairs = 0;

        const bodyGeom = new BoxGeometry(15, 15, 15);
        const bodyMat = new MeshPhongMaterial({
          color: AviatorColors.brown,
          flatShading: true,
        });
        const body = new Mesh(bodyGeom, bodyMat);
        body.position.set(2, -12, 0);

        this.mesh.add(body);

        const faceGeom = new BoxGeometry(10, 10, 10);
        const faceMat = new MeshLambertMaterial({ color: AviatorColors.pink });
        const face = new Mesh(faceGeom, faceMat);
        this.mesh.add(face);

        const hairGeom = new BoxGeometry(4, 4, 4);
        const hairMat = new MeshLambertMaterial({ color: AviatorColors.brown });
        const hair = new Mesh(hairGeom, hairMat);
        hair.geometry.applyMatrix4(new Matrix4().makeTranslation(0, 2, 0));
        const hairs = new Object3D();

        this.hairsTop = new Object3D();

        for (let i = 0; i < 12; i++) {
          const h = hair.clone();
          const col = i % 3;
          const row = Math.floor(i / 3);
          const startPosZ = -4;
          const startPosX = -4;
          h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
          this.hairsTop.add(h);
        }
        hairs.add(this.hairsTop);

        const hairSideGeom = new BoxGeometry(12, 4, 2);
        hairSideGeom.applyMatrix4(new Matrix4().makeTranslation(-6, 0, 0));
        const hairSideR = new Mesh(hairSideGeom, hairMat);
        const hairSideL = hairSideR.clone();
        hairSideR.position.set(8, -2, 6);
        hairSideL.position.set(8, -2, -6);
        hairs.add(hairSideR);
        hairs.add(hairSideL);

        const hairBackGeom = new BoxGeometry(2, 8, 10);
        const hairBack = new Mesh(hairBackGeom, hairMat);
        hairBack.position.set(-1, -4, 0);
        hairs.add(hairBack);
        hairs.position.set(-5, 5, 0);

        this.mesh.add(hairs);

        const glassGeom = new BoxGeometry(5, 5, 5);
        const glassMat = new MeshLambertMaterial({
          color: AviatorColors.brown,
        });
        const glassR = new Mesh(glassGeom, glassMat);
        glassR.position.set(6, 0, 3);
        const glassL = glassR.clone();
        glassL.position.z = -glassR.position.z;

        const glassAGeom = new BoxGeometry(11, 1, 11);
        const glassA = new Mesh(glassAGeom, glassMat);
        this.mesh.add(glassR);
        this.mesh.add(glassL);
        this.mesh.add(glassA);

        const earGeom = new BoxGeometry(2, 3, 2);
        const earL = new Mesh(earGeom, faceMat);
        earL.position.set(0, 0, -6);
        const earR = earL.clone();
        earR.position.set(0, 0, 6);
        this.mesh.add(earL);
        this.mesh.add(earR);
      }

      update(delta: number) {
        const hairs = this.hairsTop.children;

        const l = hairs.length;
        for (let i = 0; i < l; i++) {
          const h = hairs[i];
          h.scale.y = 0.75 + Math.cos(this.angleHairs + i / 3) * 0.25;
        }
        this.angleHairs += 0.16;
      }
    }

    /**
     * AirPlane
     */

    class AirPlane implements Loop {
      mesh: Object3D;
      propeller: Mesh;
      pilot: Pilot;

      constructor() {
        this.mesh = new Object3D();
        this.mesh.name = 'airPlane';

        // Cockpit

        const geomCockpit = new BoxGeometry(80, 50, 50, 1, 1, 1);

        const verticesCockpit = geomCockpit.getAttribute('position');
        applyOffsetXYZAs(verticesCockpit, 4, 0, -10, 20);
        applyOffsetXYZAs(verticesCockpit, 5, 0, -10, -20);
        applyOffsetXYZAs(verticesCockpit, 6, 0, 30, 20);
        applyOffsetXYZAs(verticesCockpit, 7, 0, 30, -20);

        const matCockpit = new MeshPhongMaterial({
          color: AviatorColors.red,
          flatShading: true,
        });

        const cockpit = new Mesh(geomCockpit, matCockpit);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        this.mesh.add(cockpit);

        // Engine

        const geomEngine = new BoxGeometry(20, 50, 50, 1, 1, 1);
        const matEngine = new MeshPhongMaterial({
          color: AviatorColors.white,
          flatShading: true,
        });
        const engine = new Mesh(geomEngine, matEngine);
        engine.position.x = 50;
        engine.castShadow = true;
        engine.receiveShadow = true;
        this.mesh.add(engine);

        // Tail Plane

        const geomTailPlane = new BoxGeometry(15, 20, 5, 1, 1, 1);
        const matTailPlane = new MeshPhongMaterial({
          color: AviatorColors.red,
          flatShading: true,
        });
        const tailPlane = new Mesh(geomTailPlane, matTailPlane);
        tailPlane.position.set(-40, 20, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;
        this.mesh.add(tailPlane);

        // Wings

        const geomSideWing = new BoxGeometry(30, 5, 120, 1, 1, 1);
        const matSideWing = new MeshPhongMaterial({
          color: AviatorColors.red,
          flatShading: true,
        });
        const sideWing = new Mesh(geomSideWing, matSideWing);
        sideWing.position.set(0, 15, 0);
        sideWing.castShadow = true;
        sideWing.receiveShadow = true;
        this.mesh.add(sideWing);

        const geomWindshield = new BoxGeometry(3, 15, 20, 1, 1, 1);
        const matWindshield = new MeshPhongMaterial({
          color: AviatorColors.white,
          transparent: true,
          opacity: 0.3,
          flatShading: true,
        });
        const windshield = new Mesh(geomWindshield, matWindshield);
        windshield.position.set(5, 27, 0);

        windshield.castShadow = true;
        windshield.receiveShadow = true;

        this.mesh.add(windshield);

        const geomPropeller = new BoxGeometry(20, 10, 10, 1, 1, 1);

        const verticesPropeller = geomPropeller.getAttribute('position');
        applyOffsetXYZAs(verticesPropeller, 4, 0, -5, 5);
        applyOffsetXYZAs(verticesPropeller, 5, 0, -5, -5);
        applyOffsetXYZAs(verticesPropeller, 6, 0, 5, 5);
        applyOffsetXYZAs(verticesPropeller, 7, 0, 5, -5);

        const matPropeller = new MeshPhongMaterial({
          color: AviatorColors.brown,
          flatShading: true,
        });
        this.propeller = new Mesh(geomPropeller, matPropeller);

        this.propeller.castShadow = true;
        this.propeller.receiveShadow = true;

        const geomBlade = new BoxGeometry(1, 80, 10, 1, 1, 1);
        const matBlade = new MeshPhongMaterial({
          color: AviatorColors.brownDark,
          flatShading: true,
        });

        const blade1 = new Mesh(geomBlade, matBlade);
        blade1.position.set(8, 0, 0);
        blade1.castShadow = true;
        blade1.receiveShadow = true;

        const blade2 = blade1.clone();
        blade2.rotation.x = Math.PI / 2;
        blade2.castShadow = true;
        blade2.receiveShadow = true;

        this.propeller.add(blade1);
        this.propeller.add(blade2);
        this.propeller.position.set(60, 0, 0);
        this.mesh.add(this.propeller);

        const wheelProtecGeom = new BoxGeometry(30, 15, 10, 1, 1, 1);
        const wheelProtecMat = new MeshPhongMaterial({
          color: AviatorColors.red,
          flatShading: true,
        });
        const wheelProtecR = new Mesh(wheelProtecGeom, wheelProtecMat);
        wheelProtecR.position.set(25, -20, 25);
        this.mesh.add(wheelProtecR);

        const wheelTireGeom = new BoxGeometry(24, 24, 4);
        const wheelTireMat = new MeshPhongMaterial({
          color: AviatorColors.brownDark,
          flatShading: true,
        });
        const wheelTireR = new Mesh(wheelTireGeom, wheelTireMat);
        wheelTireR.position.set(25, -28, 25);

        const wheelAxisGeom = new BoxGeometry(10, 10, 6);
        const wheelAxisMat = new MeshPhongMaterial({
          color: AviatorColors.brown,
          flatShading: true,
        });
        const wheelAxis = new Mesh(wheelAxisGeom, wheelAxisMat);
        wheelTireR.add(wheelAxis);

        this.mesh.add(wheelTireR);

        const wheelProtecL = wheelProtecR.clone();
        wheelProtecL.position.z = -wheelProtecR.position.z;
        this.mesh.add(wheelProtecL);

        const wheelTireL = wheelTireR.clone();
        wheelTireL.position.z = -wheelTireR.position.z;
        this.mesh.add(wheelTireL);

        const wheelTireB = wheelTireR.clone();
        wheelTireB.scale.set(0.5, 0.5, 0.5);
        wheelTireB.position.set(-35, -5, 0);
        this.mesh.add(wheelTireB);

        const suspensionGeom = new BoxGeometry(4, 20, 4);
        suspensionGeom.applyMatrix4(new Matrix4().makeTranslation(0, 10, 0));
        const suspensionMat = new MeshPhongMaterial({
          color: AviatorColors.red,
          flatShading: true,
        });
        const suspension = new Mesh(suspensionGeom, suspensionMat);
        suspension.position.set(-35, -5, 0);
        suspension.rotation.z = -0.3;
        this.mesh.add(suspension);

        this.pilot = new Pilot();
        this.pilot.mesh.position.set(-10, 27, 0);
        this.mesh.add(this.pilot.mesh);

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
      }

      update(delta: number) {
        this.propeller.rotation.x += 0.3;
        this.pilot.update(delta);
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
