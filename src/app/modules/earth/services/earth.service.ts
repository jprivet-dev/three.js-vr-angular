import { Injectable } from '@angular/core';
import { Container } from '@shared/models/container.model';
import {
  DollyCameraFactory,
  RendererFactory,
  SpaceFactory,
} from '../factories';

@Injectable({
  providedIn: 'root',
})
export class EarthService {
  constructor() {}

  buildScene(container: Container): void {
    const space = new SpaceFactory().create();
    const dolly = new DollyCameraFactory(container).create();
    const renderer = new RendererFactory(container).create();

    space.add(dolly);

    renderer.render(space, dolly.camera);
  }
}
