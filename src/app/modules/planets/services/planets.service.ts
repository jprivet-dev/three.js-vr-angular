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
  VenusFactory, VRControlsFactory,
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
    const vrControls = new VRControlsFactory(this.store, loop).create(dolly, renderer, scene);

    const sun = new SunFactory(this.store).create();
    scene.add(sun);

    const mercury = new MercuryFactory(this.store, loop).create();
    mercury.position.set(0, -3, offset);
    scene.add(mercury);

    const venus = new VenusFactory(this.store, loop).create();
    venus.position.set(0, -1.5, offset - 4);
    scene.add(venus);

    const earth = new EarthFactory(this.store, loop).create();
    earth.position.set(0, 0, offset - 8);
    scene.add(earth);

    const moon = new MoonFactory(this.store, loop).create();
    moon.position.set(2, 0, offset - 8);
    scene.add(moon);

    const mars = new MarsFactory(this.store, loop).create();
    mars.position.set(0, 1.5, offset - 12);
    scene.add(mars);

    const jupiter = new JupiterFactory(this.store, loop).create();
    jupiter.position.set(-15, 0, offset - 10);
    scene.add(jupiter);

    const saturn = new SaturnFactory(this.store, loop).create();
    saturn.position.set(15, 0, offset - 10);
    scene.add(saturn);

    const uranus = new UranusFactory(this.store, loop).create();
    uranus.position.set(0, 5, offset - 20);
    scene.add(uranus);

    const neptune = new NeptuneFactory(this.store, loop).create();
    neptune.position.set(-10, -5, offset + 10);
    scene.add(neptune);

    loop.start();
    resize.start();
    session.start();
  }
}
