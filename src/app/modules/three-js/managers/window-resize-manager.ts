import { CameraDecorator, RendererDecorator } from '../decorators';
import { ContainerDecorator } from '../decorators/container-decorator';

export class WindowResizeManager {
  constructor(
    private container: ContainerDecorator,
    private camera: CameraDecorator,
    private renderer: RendererDecorator
  ) {}

  start(): void {
    const onWindowResize = () => {
      this.camera.resize(this.container);
      this.renderer.resize(this.container);
    };

    this.container.window().addEventListener('resize', onWindowResize);
  }
}
