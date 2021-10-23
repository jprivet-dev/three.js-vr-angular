import { BoxGeometry, DirectionalLight, Mesh, MeshBasicMaterial } from 'three';
import { CubeDecorator } from '../decorators/cube-decorator';
import { SunDecorator } from '../decorators/sun-decorator';

export class SunBuilder {
  create(): SunDecorator {
    const white = 0xffffff;
    const intensity = 1.3;
    const position = {
      x: -380,
        y: 240,
        z: -1000,
    }
    const light = new DirectionalLight(white, intensity);
    light.position.set(position.x, position.y, position.z);

    return new SunDecorator(light);
  }
}
