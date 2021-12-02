import { Container } from '../../../container';
import { VRController } from './vr-controller';
import { VRControllerIndex, VRControllerPosition } from './vr-controller.model';

export class VRControllerRight extends VRController {
  constructor(container: Container, size: number) {
    super(container, VRControllerPosition.Right, VRControllerIndex.Right, size);
  }
}
