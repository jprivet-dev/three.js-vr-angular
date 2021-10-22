import { CameraDecorator, RendererDecorator, SceneDecorator } from '../decorators';

export class AnimationLooperManager {
  constructor(
    private scene: SceneDecorator,
    private camera: CameraDecorator,
    private renderer: RendererDecorator
  ) {}

  start(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this.scene.animate();
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
}
