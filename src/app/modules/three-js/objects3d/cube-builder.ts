import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { CubeDecorator } from './cube-decorator';

export class CubeBuilder {
  private decorator!: CubeDecorator;

  createDecorator(): CubeDecorator {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    this.decorator = new CubeDecorator(cube);
    return this.decorator;
  }
}
