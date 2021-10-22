import { ElementRef, Injectable } from '@angular/core';
import {
  CameraBuilder,
  CubeBuilder,
  RendererBuilder,
  SceneBuilder,
} from '../builders';
import { ContainerDecorator } from '../decorators/container-decorator';
import { AnimationManager } from '../managers/animation-manager';

@Injectable({
  providedIn: 'root',
})
export class ThreeJsService {
  constructor(private window: Window) {}

  buildScene(containerRef: ElementRef): void {
    const containerNativeElement: HTMLDivElement = containerRef?.nativeElement;

    if (!containerNativeElement) {
      console.error('`container` is indefined.');
      return;
    }

    const container = new ContainerDecorator(containerNativeElement);
    const scene = new SceneBuilder().create();
    const camera = new CameraBuilder().create(container);
    const renderer = new RendererBuilder().create();

    const cube = new CubeBuilder().create();
    scene.add(cube);

    renderer.start(container, scene, camera);

    const animation = new AnimationManager(scene, camera, renderer);
    animation.start();

    // function onWindowResize() {
    //   cameraDecorator.resize();
    //   rendererDecorator.resize();
    // }
    //
    // this.window.addEventListener('resize', onWindowResize);
  }
}
