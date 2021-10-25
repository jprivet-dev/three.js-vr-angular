import { ElementRef } from '@angular/core';
import { ContainerDecorator } from '../decorators';

// Here abstract is it a good idea ?
export abstract class ContainerFactory {
  static create(
    window: Window,
    containerRef: ElementRef,
  ): ContainerDecorator {
    return new ContainerDecorator(window, containerRef);
  }
}
