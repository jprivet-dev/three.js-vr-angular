import { Container } from '../../../container';
import { VRController } from './vr-controller';
import { VRControllerIndex, VRControllerPosition } from './vr-controller.model';

export class VRControllerLeft extends VRController {
  constructor(container: Container, size: number = 5) {
    super(container, VRControllerPosition.Left, VRControllerIndex.Left, size);
  }
}
