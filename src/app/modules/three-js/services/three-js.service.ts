import { ElementRef, Injectable } from '@angular/core';
import {
  CameraBuilder,
  CubeBuilder,
  RendererBuilder,
  SceneBuilder,
} from '../builders';
import { ContainerDecorator } from '../decorators';
import { AnimationLooperManager, WindowResizeManager } from '../managers';

@Injectable({
  providedIn: 'root',
})
export class ThreeJsService {
  constructor(private window: Window) {}

  buildScene(containerRef: ElementRef): void {
    const container = new ContainerDecorator(containerRef);
    const scene = new SceneBuilder().create();
    const camera = new CameraBuilder().create(container);
    const renderer = new RendererBuilder().create().insertVRButton(container);

    const cube = new CubeBuilder().create();
    scene.add(cube);

    renderer.start(this.window, container, scene, camera);
    new AnimationLooperManager(scene, camera, renderer).start();
    new WindowResizeManager(this.window, container, camera, renderer).start();
  }
}
