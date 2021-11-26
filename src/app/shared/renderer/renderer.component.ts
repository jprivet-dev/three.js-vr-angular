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
import { WebGLRenderer } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';
import { Container } from '../threejs/containers';
import { RendererEvent } from './renderer.model';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss'],
})
export class RendererComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') private containerRef!: ElementRef;

  @Input() antialias$: Observable<boolean> = of(false);
  @Input() parameters: WebGLRendererParameters = {};
  @Input() vrButton: boolean = false;

  @Output() rendererInit = new EventEmitter<RendererEvent>();
  @Output() rendererUpdate = new EventEmitter<RendererEvent>();
  @Output() vrSessionStart = new EventEmitter<void>();
  @Output() vrSessionEnd = new EventEmitter<void>();

  container!: Container;
  subscription!: Subscription;
  renderer!: WebGLRenderer;
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

    this.renderer = new WebGLRenderer(parameters);
    this.renderer.setPixelRatio(this.container.window.devicePixelRatio);
    this.renderer.setSize(this.container.width(), this.container.height());

    this.container.empty();
    this.container.appendChild(this.renderer.domElement);

    /**
     * VR button
     */

    if (this.vrButton) {
      // https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
      const button = VRButton.createButton(this.renderer);
      this.renderer.xr.enabled = true; // enable XR rendering
      this.renderer.xr.setReferenceSpaceType('local');
      this.container.appendChild(button);

      this.connectVRSessionEvents();
    }

    /**
     * Events
     */

    if (this.firstCall) {
      this.rendererInit.next({
        container: this.container,
        renderer: this.renderer,
      });
      this.firstCall = false;
      return;
    }

    this.rendererUpdate.next({
      container: this.container,
      renderer: this.renderer,
    });
  }

  private connectVRSessionEvents(): void {
    if (!this.renderer) {
      return;
    }

    this.renderer.xr.addEventListener(
      'sessionstart',
      this.vrSessionStartEvent.bind(this)
    );
    this.renderer.xr.addEventListener(
      'sessionend',
      this.vrSessionEndEvent.bind(this)
    );
  }

  private disconnectVRSessionEvents(): void {
    if (!this.renderer) {
      return;
    }

    this.renderer.xr.removeEventListener(
      'sessionstart',
      this.vrSessionStartEvent.bind(this)
    );
    this.renderer.xr.removeEventListener(
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
