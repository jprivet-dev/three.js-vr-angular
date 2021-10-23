import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RendererDecorator } from '../decorators';
import { CameraDecorator } from '../decorators/camera-decorator';
import { OrbitControlsDecorator } from '../decorators/orbit-controls-decorator';

export class OrbitControlsBuilder {
  create(camera: CameraDecorator, renderer: RendererDecorator): OrbitControlsDecorator {
    const controls = new OrbitControls(camera.object3D(), renderer.domElement());
    return new OrbitControlsDecorator(controls);
  }
}
