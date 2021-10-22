import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { CubeDecorator } from '../decorators/cube-decorator';

export class CubeBuilder {
  create(): CubeDecorator {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    return new CubeDecorator(cube);
  }
}
