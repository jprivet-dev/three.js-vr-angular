import { ElementRef, Injectable } from '@angular/core';
import { AnimationManager } from '../models/animation-manager';
import { CameraBuilder } from '../objects3d/camera-builder';
import { CubeBuilder } from '../objects3d/cube-builder';
import { RendererBuilder } from '../objects3d/renderer-builder';
import { SceneBuilder } from '../objects3d/scene-builder';

@Injectable({
  providedIn: 'root',
})
export class ThreeJsService {
  constructor(private window: Window) {}

  buildScene(containerRef: ElementRef): void {
    const container = this.getContainer(containerRef);

    if (!container) {
      console.error('`container` is indefined.');
      return;
    }

    const sceneDecorator = new SceneBuilder().createDecorator();
    const cameraDecorator = new CameraBuilder(container).createDecorator();
    const rendererDecorator = new RendererBuilder(
      this.window,
      container,
      sceneDecorator,
      cameraDecorator
    ).createDecorator();

    const cubeDecorator = new CubeBuilder().createDecorator();
    sceneDecorator.scene.add(cubeDecorator.cube);

    rendererDecorator.render();
    // const animation = new AnimationManager(rendererDecorator);
    // animation.add(cubeDecorator);
    // animation.start();
  }

  private getContainer(containerRef: ElementRef): Element {
    return containerRef?.nativeElement;
  }
}
