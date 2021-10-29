import { Injectable } from '@angular/core';
import { Container } from '@shared/models/container.model';
import {
  DollyCameraFactory, EarthFactory, VRRendererFactory, SpaceFactory, SunFactory, CloudsFactory,
} from '../factories';
import { SunLensflareFactory } from '../factories/sun-lensflare.factory';
import { AnimationLooperManager, WindowResizeManager } from '../managers';
import { VRSessionManager } from '../managers/vr-session.manager';
import { Controls } from '../threejs';

@Injectable({
  providedIn: 'root',
})
export class EarthService {
  constructor() {}

  buildScene(container: Container): void {
    const space = new SpaceFactory().create();
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
    const lensflare = new SunLensflareFactory().create();
    sun.add(lensflare);
    space.add(sun);

    const earth = new EarthFactory().create();
    space.add(earth);
    looper.add(earth);

    const clouds = new CloudsFactory().create();
    earth.add(clouds);
    looper.add(clouds);

    looper.start();
    resize.start();
    session.start();
  }
}
