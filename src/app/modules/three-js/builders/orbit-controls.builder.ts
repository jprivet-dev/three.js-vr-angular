import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  CameraDecorator,
  OrbitControlsDecorator,
  RendererDecorator,
} from '../decorators';

export abstract class OrbitControlsBuilder {
  static create(
    camera: CameraDecorator,
    renderer: RendererDecorator
  ): OrbitControlsDecorator {
    const controls = new OrbitControls(
      camera.object3D(),
      renderer.domElement()
    );
    return new OrbitControlsDecorator(controls);
  }
}
