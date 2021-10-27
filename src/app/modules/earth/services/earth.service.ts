import { Injectable } from '@angular/core';
import { Container } from '@shared/models/container.model';
import { DollyCameraFactory } from '../factories/dolly-camera-factory';
import { SpaceFactory } from '../factories/spaceFactory';

@Injectable({
  providedIn: 'root',
})
export class EarthService {
  constructor() {
  }

  buildScene(container: Container): void {
    const space = new SpaceFactory().create();
    const camera = new DollyCameraFactory(container).create();
  }
}
