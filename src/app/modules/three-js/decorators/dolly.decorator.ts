import { Object3D } from 'three';
import { Decorator } from './decorator';

export class DollyDecorator extends Decorator {
  constructor(object: Object3D) {
    super(object);
  }
}
