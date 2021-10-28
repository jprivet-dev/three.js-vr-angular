import { Injectable } from '@angular/core';
import { Container } from '@shared/models/container.model';
import {
  DollyCameraFactory,
  EarthFactory,
  RendererVRFactory,
  SpaceFactory,
  SunFactory,
} from '../factories';
import { AnimationLooperManager, WindowResizeManager } from '../managers';

@Injectable({
  providedIn: 'root',
})
export class EarthService {
  constructor() {}

  buildScene(container: Container): void {
    const space = new SpaceFactory().create();
    const dolly = new DollyCameraFactory(container).create();
    space.add(dolly);

    const renderer = new RendererVRFactory(container).create(space, dolly);
    const looper = new AnimationLooperManager(renderer);
    const resize = new WindowResizeManager(container, dolly, renderer);

    const sun = new SunFactory().create();
    space.add(sun);

    const earth = new EarthFactory().create();
    space.add(earth);
    looper.add(earth);

    looper.start();
    resize.start();
  }
}
