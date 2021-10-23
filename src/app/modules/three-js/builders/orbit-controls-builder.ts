import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RendererDecorator } from '../decorators';
import { CameraDecorator } from '../decorators/camera-decorator';

export class OrbitControlsBuilder {
  create(camera: CameraDecorator, renderer: RendererDecorator): OrbitControls {
    return new OrbitControls(camera.object3D(), renderer.domElement());
  }
}
