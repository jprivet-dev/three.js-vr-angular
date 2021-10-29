import { Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { Container } from '@shared/models/container.model';
import {
  CloudsFactory,
  DollyCameraFactory,
  EarthFactory,
  SpaceFactory,
  SunFactory,
  SunLensflareFactory,
  VRRendererFactory,
} from '../factories';
import {
  AnimationLooperManager,
  VRSessionManager,
  WindowResizeManager,
} from '../managers';
import { Controls } from '../threejs';

@Injectable({
  providedIn: 'root',
})
export class EarthService {
  constructor(private store: StoreService) {}

  buildScene(container: Container): void {
    const space = new SpaceFactory(this.store).create();
    const dolly = new DollyCameraFactory(container).create();
    space.add(dolly);

    const renderer = new VRRendererFactory(container).create(space, dolly);
    const looper = new AnimationLooperManager(renderer);
    const resize = new WindowResizeManager(container, dolly, renderer);
    const session = new VRSessionManager(renderer);
    session.add(dolly);

    const controls = new Controls(dolly, renderer);
    controls.enableAutoRotate();
    looper.add(controls);

    const sun = new SunFactory().create();
    space.add(sun);

    const lensflare = new SunLensflareFactory(this.store).create();
    sun.add(lensflare);

    const earth = new EarthFactory(this.store).create();
    space.add(earth);
    looper.add(earth);

    const clouds = new CloudsFactory(this.store).create();
    earth.add(clouds);
    looper.add(clouds);

    looper.start();
    resize.start();
    session.start();
  }
}
