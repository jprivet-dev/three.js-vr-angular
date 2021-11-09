import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import {
  Container,
  ControlsFactory,
  DollyCameraFactory,
  DollyCameraParams,
  EarthFactory,
  JupiterFactory,
  LoopManager,
  MarsFactory,
  MercuryFactory,
  MoonFactory,
  NeptuneFactory,
  SaturnFactory,
  StarsFactory,
  SunFactory,
  UranusFactory,
  VenusFactory, VRControllerFactory,
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
    const loop = new LoopManager(renderer);
    const resize = new WindowResizeManager(container, dolly, renderer);
    const session = new VRSessionManager(this.store, renderer);
    session.add(dolly);

    const controls = new ControlsFactory(loop).create(dolly, renderer);
    const vrControllerFactory = new VRControllerFactory(this.store, scene, renderer);
    const controllerRight = vrControllerFactory.createRight();
    const controllerLeft = vrControllerFactory.createLeft();

    const sun = new SunFactory(this.store).create();
    scene.add(sun);

    const mercury = new MercuryFactory(this.store, loop).create();
    mercury.position.set(1.5, -2, offset - 1);
    scene.add(mercury);

    const venus = new VenusFactory(this.store, loop).create();
    venus.position.set(-1.5, -2, offset - 1);
    scene.add(venus);

    const earth = new EarthFactory(this.store, loop).create();
    earth.position.set(1.5, 0, offset - 5);
    scene.add(earth);

    const moon = new MoonFactory(this.store, loop).create();
    moon.position.set(earth.position.x + 2, 0, earth.position.z);
    scene.add(moon);

    const mars = new MarsFactory(this.store, loop).create();
    mars.position.set(-1.5, 0, offset - 5);
    scene.add(mars);

    const jupiter = new JupiterFactory(this.store, loop).create();
    jupiter.position.set(-17, 0, offset - 5);
    scene.add(jupiter);

    const saturn = new SaturnFactory(this.store, loop).create();
    saturn.position.set(17, 0, offset - 5);
    scene.add(saturn);

    const uranus = new UranusFactory(this.store, loop).create();
    uranus.position.set(-5, 3, offset - 18);
    scene.add(uranus);

    const neptune = new NeptuneFactory(this.store, loop).create();
    neptune.position.set(5, 5, offset - 18);
    scene.add(neptune);

    loop.start();
    resize.start();
    session.start();
  }
}
