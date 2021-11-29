import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';
import { Container } from '../threejs/containers';
import { ContainerEvent } from './container.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') private containerRef!: ElementRef;

  @Input() antialias$: Observable<boolean> = of(false);
  @Input() parameters: WebGLRendererParameters = {};
  @Input() vrButton: boolean = false;
  @Input() statsEnable: boolean = false;

  @Output() rendererInit = new EventEmitter<ContainerEvent>();
  @Output() rendererUpdate = new EventEmitter<ContainerEvent>();
  @Output() vrSessionStart = new EventEmitter<void>();
  @Output() vrSessionEnd = new EventEmitter<void>();

  subscription!: Subscription;
  container!: Container;
  firstCall: boolean = true;

  constructor(private window: Window) {}

  ngAfterViewInit(): void {
    this.container = new Container(this.window, this.containerRef);

    this.subscription = this.antialias$.subscribe((antialias) => {
      this.parameters.antialias = antialias;
      this.createRenderer(this.parameters);
    });
  }

  private createRenderer(parameters: WebGLRendererParameters): void {
    /**
     * Renderer
     */

    this.disconnectVRSessionEvents();
    this.container.createRenderer(parameters);

    /**
     * VR button
     */

    if (this.vrButton) {
      this.container.createVRButton();
      this.connectVRSessionEvents();
    }

    /**
     * Stats
     */

    if (this.statsEnable) {
      this.container.createStats();
    }

    /**
     * Events
     */

    if (this.firstCall) {
      this.rendererInit.next({
        container: this.container,
        renderer: this.container.renderer,
        stats: this.container.stats,
      });
      this.firstCall = false;
      return;
    }

    this.rendererUpdate.next({
      container: this.container,
      renderer: this.container.renderer,
      stats: this.container.stats,
    });
  }

  private connectVRSessionEvents(): void {
    if (!this.container.renderer) {
      return;
    }

    this.container.renderer.xr.addEventListener(
      'sessionstart',
      this.vrSessionStartEvent.bind(this)
    );
    this.container.renderer.xr.addEventListener(
      'sessionend',
      this.vrSessionEndEvent.bind(this)
    );
  }

  private disconnectVRSessionEvents(): void {
    if (!this.container.renderer) {
      return;
    }

    this.container.renderer.xr.removeEventListener(
      'sessionstart',
      this.vrSessionStartEvent.bind(this)
    );
    this.container.renderer.xr.removeEventListener(
      'sessionend',
      this.vrSessionEndEvent.bind(this)
    );
  }

  private vrSessionStartEvent() {
    this.vrSessionStart.next();
  }

  private vrSessionEndEvent() {
    this.vrSessionEnd.next();
  }

  ngOnDestroy() {
    this.disconnectVRSessionEvents();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
