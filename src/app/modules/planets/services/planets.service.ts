import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import {
  AnimationManager,
  Container,
  ControlsFactory,
  DollyCameraAnimation,
  DollyCameraFactory,
  DollyCameraParams,
  Earth,
  JupiterFactory,
  MarsFactory,
  Mercury,
  MoonFactory,
  NeptuneFactory,
  SaturnFactory,
  StarsFactory,
  SunFactory,
  UranusFactory,
  Venus,
  VRControllerFactory,
  VRRendererFactory,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs';
import { planetsDollyCameraParams } from './planets.params';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private dollyCameraParams: DollyCameraParams = planetsDollyCameraParams;

  constructor(private store: StoreService) {}

  buildScene(container: Container): void {
    this.store.antialias$.subscribe((antialias) => {
      this.onAntialiasChange(container, antialias);
    });
  }

  private onAntialiasChange(container: Container, antialias: boolean) {
    const offset = 5;
    container.empty();

    const scene = new StarsFactory(this.store).create();
    const dolly = new DollyCameraFactory(container).create(
      this.dollyCameraParams
    );
    scene.add(dolly);

    const renderer = new VRRendererFactory(container).create(scene, dolly, {
      antialias,
    });

    const animation = new AnimationManager(renderer);
    const resize = new WindowResizeManager(container, dolly, renderer);
    const session = new VRSessionManager(this.store, renderer);
    session.add(dolly);

    const controls = new ControlsFactory().create(dolly, renderer);
    animation.add(controls);

    const vrControllerFactory = new VRControllerFactory(
      this.store,
      scene,
      renderer
    );
    const controllerRight = vrControllerFactory.createRight();
    // const controllerLeft = vrControllerFactory.createLeft();

    const dollyAnimation = new DollyCameraAnimation(dolly, renderer);
    animation.add(dollyAnimation);

    this.store.vrControllerRightIsSelecting$.subscribe((isSelecting) => {
      isSelecting ? dollyAnimation.moveSwitch() : dollyAnimation.stop();
    });

    // this.store.vrControllerLeftIsSelecting$.subscribe((isSelecting) => {
    //   isSelecting ? dollyAnimation.moveBackward() :  dollyAnimation.stop();
    // });

    const sun = new SunFactory(this.store).create();
    scene.add(sun);

    const mercury = new Mercury(this.store);
    mercury.mesh.position.set(1.5, -2, offset - 1);
    scene.add(mercury.mesh);
    animation.add(mercury);

    const venus = new Venus(this.store);
    venus.mesh.position.set(-1.5, -2, offset - 1);
    scene.add(venus.mesh);
    animation.add(venus);

    const earth = new Earth(this.store);
    earth.mesh.position.set(1.5, 0, offset - 5);
    scene.add(earth.mesh);
    animation.add(earth);

    const moon = new MoonFactory(this.store).create();
    moon.position.set(earth.mesh.position.x + 2, 0, earth.mesh.position.z);
    scene.add(moon);
    animation.add(moon.getAnimation());

    const mars = new MarsFactory(this.store).create();
    mars.position.set(-1.5, 0, offset - 5);
    scene.add(mars);
    animation.add(mars.getAnimation());

    const jupiter = new JupiterFactory(this.store).create();
    jupiter.position.set(-17, 0, offset - 5);
    scene.add(jupiter);
    animation.add(jupiter.getAnimation());

    const saturn = new SaturnFactory(this.store).create();
    saturn.position.set(17, 0, offset - 5);
    scene.add(saturn);
    animation.add(saturn.getAnimation());

    const uranus = new UranusFactory(this.store).create();
    uranus.position.set(-5, 3, offset - 18);
    scene.add(uranus);
    animation.add(uranus.getAnimation());

    const neptune = new NeptuneFactory(this.store).create();
    neptune.position.set(5, 5, offset - 18);
    scene.add(neptune);
    animation.add(neptune.getAnimation());

    animation.start();
    resize.start();
    session.start();
  }
}
