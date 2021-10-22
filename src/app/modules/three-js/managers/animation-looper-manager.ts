import {
  CameraDecorator,
  RendererDecorator,
  SceneDecorator,
} from '../decorators';

export class AnimationLooperManager {
  constructor(
    private scene: SceneDecorator,
    private camera: CameraDecorator,
    private renderer: RendererDecorator
  ) {}

  start(): void {
    this.renderer.setAnimationLoop(() => {
      this.scene.animate();
      this.renderer.render(this.scene, this.camera);
    });
  }
}
