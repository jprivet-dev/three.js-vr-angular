import { ElementRef } from '@angular/core';
import { ContainerDecorator } from '../decorators/container-decorator';

export abstract class ContainerBuilder {
  static create(window: Window, containerRef: ElementRef): ContainerDecorator {
    return new ContainerDecorator(window, containerRef);
  }
}
