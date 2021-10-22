import { CameraDecorator, RendererDecorator, SceneDecorator } from '../decorators';
import { ContainerDecorator } from '../decorators/container-decorator';

export class WindowResizeManager {
  constructor(
    private window: Window,
    private container: ContainerDecorator,
    private camera: CameraDecorator,
    private renderer: RendererDecorator
  ) {}

  start(): void {
    const onWindowResize = () => {
      this.camera.resize(this.container);
      this.renderer.resize(this.container);
    }

    this.window.addEventListener('resize', onWindowResize);
  }
}
