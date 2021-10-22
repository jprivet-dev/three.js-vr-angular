import { CameraDecorator, RendererDecorator, SceneDecorator } from '../decorators';

export class AnimationManager {
  constructor(
    private scene: SceneDecorator,
    private camera: CameraDecorator,
    private renderer: RendererDecorator
  ) {}

  start() {
    const animate = () => {
      requestAnimationFrame(animate);
      this.scene.animate();
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
}
