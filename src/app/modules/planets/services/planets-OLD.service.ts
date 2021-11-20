import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { DollyCamera, DollyCameraParams } from '@shared/threejs/cameras';
import { Container } from '@shared/threejs/containers';
import { SwitchControls } from '@shared/threejs/controls';
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
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { PlanetsActions } from '../store/actions';
import { PlanetsFacade } from '../store/planets.facade';
import { planetsDollyCameraParams } from './planets.params';

@Injectable({
  providedIn: 'root',
})
export class PlanetsServiceOLD {
  private dollyCameraParams: DollyCameraParams = planetsDollyCameraParams;
  private controls!: SwitchControls;
  private subscription = new Subscription();


  constructor(private store: StoreService, private facade: PlanetsFacade) {}

  buildScene(container: Container): void {
    this.facade.antialias$.subscribe((antialias) => {
      this.buildSceneAntialias(container, antialias);
    });
  }

  private buildSceneAntialias(container: Container, antialias: boolean) {
    let renderer: Renderer;
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

    // const vrControllerFactory = new VRControllerFactory(
    //   this.store,
    //   scene,
    //   renderer
    // );
    // const controllerRight = vrControllerFactory.createRight();
    // // const controllerLeft = vrControllerFactory.createLeft();
    //
    // const dollyAnimation = new DollyCameraAnimation(dolly, renderer);
    // loop.add(dollyAnimation);
    //
    // this.store.vrControllerRightIsSelecting$.subscribe((isSelecting) => {
    //   if (isSelecting) {
    //     dollyAnimation.moveSwitch();
    //   }
    // });
    //
    // // this.store.vrControllerLeftIsSelecting$.subscribe((isSelecting) => {
    // //   isSelecting ? dollyAnimation.moveBackward() :  dollyAnimation.stop();
    // // });

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

    // this.controls = new SwitchControls(dolly.camera, renderer.domElement);
    // loop.add(this.controls);

    // const controls = new FlyControlsManager(container, dolly);
    //
    // this.store.isFlyMode$.subscribe((state) => {
    //   state ? controls.pointer.enable() : controls.pointer.disable();
    // });
    //
    // controls.pointer.isLocked$.subscribe((isLocked) => {
    //   if (!isLocked) {
    //     this.store.flyModeOff();
    //   }
    // });
    // controls.orbit.target = earth.mesh.position;
    //loop.add(controls);

    /**
     * Renderer
     */

    renderer = new Renderer({ antialias });
    renderer.setPixelRatio(container.window.devicePixelRatio);
    renderer.resize(container);

    container.empty();
    container.appendChild(renderer.domElement);

    // https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
    const button = VRButton.createButton(renderer);
    renderer.xr.enabled = true; // enable XR rendering
    renderer.xr.setReferenceSpaceType('local');
    container.appendChild(button);

    resize.add(renderer);

    const rendererConnect = () => {
      renderer.xr.addEventListener('sessionstart', eventVRSessionStart);
      renderer.xr.addEventListener('sessionend', eventVRSessionEnd);
    };

    const rendererDisconnect = () => {
      renderer.xr.removeEventListener('sessionstart', eventVRSessionStart);
      renderer.xr.removeEventListener('sessionend', eventVRSessionEnd);
    };

    const eventVRSessionStart = () => {
      console.log('eventVRSessionStart');
      this.facade.dispatch(PlanetsActions.vrSessionStart());
    };

    const eventVRSessionEnd = () => {
      this.facade.dispatch(PlanetsActions.vrSessionEnd());
    };

    const animate = () => {
      renderer.setAnimationLoop(render);
    };

    const render = () => {
      loop.update();
      renderer.render(scene, dolly.camera);
    };

    rendererConnect();
    animate();

    /**
     * Controls
     */

    controls = new OrbitControls(dolly.camera, renderer.domElement);
    controls.autoRotateSpeed = 0.2;
    controls.autoRotate = true;
    controls.enableDamping = true;
    controls.target = earth.mesh.position;
    loop.add(controls);

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
  }
}
