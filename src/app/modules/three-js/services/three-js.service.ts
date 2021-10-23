import { ElementRef, Injectable } from '@angular/core';
import {
  CameraBuilder,
  CubeBuilder,
  RendererBuilder,
  SceneBuilder,
} from '../builders';
import { SkyboxBuilder } from '../builders/skybox-builder';
import { ContainerDecorator } from '../decorators';
import { AnimationLooperManager, WindowResizeManager } from '../managers';

@Injectable({
  providedIn: 'root',
})
export class ThreeJsService {
  constructor(private window: Window) {}

  buildScene(containerRef: ElementRef): void {
    const container = new ContainerDecorator(this.window, containerRef);
    const scene = new SceneBuilder().create();
    const camera = new CameraBuilder().create(container);
    const renderer = new RendererBuilder().create().insertVRButton(container);

    const cube = new CubeBuilder().create();
    scene.add(cube);

    const skybox = new SkyboxBuilder().create();
    scene.addCubeTexture(skybox.cubeTexture);

    renderer.start(container, scene, camera);
    new AnimationLooperManager(scene, camera, renderer).start();
    new WindowResizeManager(container, camera, renderer).start();
  }
}
