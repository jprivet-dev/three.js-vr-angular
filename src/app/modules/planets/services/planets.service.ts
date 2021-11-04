import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { RadiusRatioEarth } from '@shared/constants';
import {
  CloudsFactory,
  Container,
  Controls,
  DollyCameraFactory,
  EarthFactory,
  JupiterFactory,
  LoopManager, MarsFactory,
  StarsFactory,
  SunFactory,
  SunLensflareFactory,
  VRRendererFactory,
  VRSessionManager,
  WindowResizeManager,
} from '@shared/threejs';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  constructor(private store: StoreService) {
  }

  buildScene(container: Container): void {
    this.store.antialias$.subscribe((antialias) => {
      this.onAntialiasChange(container, antialias);
    });
  }

  private onAntialiasChange(container: Container, antialias: boolean) {
    container.empty();

    const planetPosition = {
      mars: -(RadiusRatioEarth.Earth + 0.5 + RadiusRatioEarth.Mars),
      jupiter: RadiusRatioEarth.Earth + 0.5 + RadiusRatioEarth.Jupiter,
    };

    const space = new StarsFactory(this.store).create();
    const dolly = new DollyCameraFactory(container).create();
    space.add(dolly);

    const renderer = new VRRendererFactory(container).create(space, dolly, {
      antialias,
    });
    const loop = new LoopManager(renderer);
    const resize = new WindowResizeManager(container, dolly, renderer);
    const session = new VRSessionManager(renderer);
    session.add(dolly);

    const controls = new Controls(dolly, renderer);
    controls.enableAutoRotate();
    loop.add(controls);

    const sun = new SunFactory().create();
    space.add(sun);

    const lensflare = new SunLensflareFactory(this.store).create();
    sun.add(lensflare);

    const earth = new EarthFactory(this.store).create();
    space.add(earth);
    loop.add(earth);

    const clouds = new CloudsFactory(this.store).create();
    earth.add(clouds);
    loop.add(clouds);

    const jupiter = new JupiterFactory(this.store).create();
    jupiter.position.set(planetPosition.jupiter, 0, 0);
    space.add(jupiter);
    loop.add(jupiter);

    const mars = new MarsFactory(this.store).create();
    mars.position.set(planetPosition.mars, 0, 0);
    space.add(mars);
    loop.add(mars);

    loop.start();
    resize.start();
    session.start();
  }
}
