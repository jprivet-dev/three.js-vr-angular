import { ElementRef, Injectable } from '@angular/core';
import { AnimationManager } from '../models/animation-manager';
import { Camera } from '../objects3d/camera';
import { Cube } from '../objects3d/cube';
import { Renderer } from '../objects3d/renderer';
import { Scene } from '../objects3d/scene';

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

    const scene = new Scene();
    const camera = new Camera(container);
    const renderer = new Renderer(this.window, container, scene, camera);

    const cube = new Cube();
    scene.add(cube);

    const animation = new AnimationManager(renderer);
    animation.add(cube);
    animation.start();
  }

  private getContainer(containerRef: ElementRef): Element {
    return containerRef?.nativeElement;
  }
}
