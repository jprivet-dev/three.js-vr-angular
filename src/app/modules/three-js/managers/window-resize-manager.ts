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
      this.camera.resize();
      this.renderer.resize();
    };

    this.container.window().addEventListener('resize', onWindowResize);
  }
}
