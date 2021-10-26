import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  CameraDecorator,
  OrbitControlsDecorator,
  RendererDecorator,
} from '../decorators';

// Here abstract is it a good idea ?
export abstract class OrbitControlsFactory {
  static create(
    camera: CameraDecorator,
    renderer: RendererDecorator
  ): OrbitControlsDecorator {
    const controls = new OrbitControls(camera.object(), renderer.domElement());
    return new OrbitControlsDecorator(controls);
  }
}
