import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Container } from '../threejs/containers';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss'],
})
export class RendererComponent implements AfterViewInit {
  @ViewChild('container') private containerRef!: ElementRef;
  @Output() containerInit = new EventEmitter<Container>();

  constructor(private window: Window) {}

  ngAfterViewInit(): void {
    const container = new Container(this.window, this.containerRef);
    this.containerInit.next(container);
  }
}
