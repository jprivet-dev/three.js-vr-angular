import { ElementRef, Injectable } from '@angular/core';
import {
  CameraBuilder,
  CubeBuilder,
  RendererBuilder,
  SceneBuilder,
} from '../builders';
import { ContainerDecorator } from '../decorators/container-decorator';

@Injectable({
  providedIn: 'root',
})
export class ThreeJsService {
  constructor(private window: Window) {}

  buildScene(containerRef: ElementRef): void {
    const container: HTMLDivElement = containerRef?.nativeElement;

    if (!container) {
      console.error('`container` is indefined.');
      return;
    }

    const containerDecorator = new ContainerDecorator(container);
    const sceneDecorator = new SceneBuilder().createDecorator();
    const cameraDecorator = new CameraBuilder().createDecorator(containerDecorator);
    const rendererDecorator = new RendererBuilder().createDecorator(
      this.window,
      containerDecorator,
      sceneDecorator,
      cameraDecorator
    );

    rendererDecorator.resize();

    container.appendChild(rendererDecorator.renderer.domElement);

    const cubeDecorator = new CubeBuilder().createDecorator();
    sceneDecorator.scene.add(cubeDecorator.cube);

    const animate = function () {
      requestAnimationFrame(animate);
      cubeDecorator.animate();
      rendererDecorator.render();
    };

    function onWindowResize() {
      cameraDecorator.resize();
      rendererDecorator.resize();
    }

    this.window.addEventListener('resize', onWindowResize);
    animate();
  }
}
