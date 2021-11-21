import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { Container } from '@shared/threejs/containers';
import { SunLight } from '@shared/threejs/lights';
import {
  LoopManager,
  TextureManager,
  VRSessionManager,
  WindowResizeManager,
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
import { Renderer } from '@shared/threejs/renderers';
import { StarsScene } from '@shared/threejs/scenes';
import { Subscription } from 'rxjs';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Camera, Vector3 } from 'three/src/Three';
import { PlanetsFacade } from '../store/planets.facade';
import { planetsDollyCameraParams } from './planets.params';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private dollyCameraParams: DollyCameraParams = planetsDollyCameraParams;
  private subscription = new Subscription();

  private renderer!: Renderer;

  private controls!: OrbitControls;
  private orbitControlsCamera!: Camera;
  private orbitControlsTarget!: Vector3;

  private alreadyBuilt: boolean = false;

  constructor(private store: StoreService, private facade: PlanetsFacade) {}

  buildScene(container: Container, renderer: Renderer) {
    this.renderer = renderer;

    if (this.alreadyBuilt) {
      this.updateControls(this.renderer.domElement);
      return;
    }

    // let renderer: Renderer;
    let controls: OrbitControls;

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

    const stars = new StarsScene();
    texture.add(stars);
    const scene = stars.scene;

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

    const sun = new SunLight();
    scene.add(sun.light);
    texture.add(sun);

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

    this.controls = this.createControls(
      dolly.camera,
      this.renderer.domElement,
      earth.mesh.position
    );
    loop.add(this.controls);

    this.alreadyBuilt = true;
  }

  createControls(
    camera: Camera,
    domElement: HTMLElement,
    target: Vector3
  ): OrbitControls {
    this.orbitControlsCamera = camera;
    this.orbitControlsTarget = target;

    const controls = new OrbitControls(camera, domElement);
    controls.autoRotateSpeed = 0.2;
    controls.autoRotate = true;
    controls.enableDamping = true;
    controls.target = target;

    return controls;
  }

  updateControls(domElement: HTMLElement) {
    const controls = new OrbitControls(this.orbitControlsCamera, domElement);
    controls.autoRotateSpeed = 0.2;
    controls.autoRotate = true;
    controls.enableDamping = true;
    controls.target = this.orbitControlsTarget;
  }
}
