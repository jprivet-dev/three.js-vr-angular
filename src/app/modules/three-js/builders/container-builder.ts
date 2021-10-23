import { ElementRef } from '@angular/core';
import { ContainerDecorator } from '../decorators/container-decorator';

export class ContainerBuilder {
  create(window: Window, containerRef: ElementRef): ContainerDecorator {
    return new ContainerDecorator(window, containerRef);
  }
}
