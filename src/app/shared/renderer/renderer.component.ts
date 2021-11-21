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
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { Container } from '../threejs/containers';
import { Renderer } from '../threejs/renderers';
import { RendererInitEvent } from './renderer.model';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss'],
})
export class RendererComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') private containerRef!: ElementRef;

  @Input() antialias$: Observable<boolean> = of(false);

  @Output() rendererInit = new EventEmitter<RendererInitEvent>();
  @Output() vrSessionStart = new EventEmitter<void>();
  @Output() vrSessionEnd = new EventEmitter<void>();

  subscription!: Subscription;
  renderer!: Renderer;

  constructor(private window: Window) {}

  ngAfterViewInit(): void {
    this.subscription = this.antialias$.subscribe((antialias) =>
      this.init(antialias)
    );
  }

  init(antialias: boolean): void {
    const container = new Container(this.window, this.containerRef);

    this.renderer = new Renderer({ antialias });
    this.renderer.setPixelRatio(container.window.devicePixelRatio);
    this.renderer.resize(container);

    container.empty();
    container.appendChild(this.renderer.domElement);

    // https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
    const button = VRButton.createButton(this.renderer);
    this.renderer.xr.enabled = true; // enable XR rendering
    this.renderer.xr.setReferenceSpaceType('local');
    container.appendChild(button);

    this.connect();

    this.rendererInit.next({
      container,
      renderer: this.renderer,
    });
  }

  connect() {
    this.renderer.xr.addEventListener(
      'sessionstart',
      this.vrSessionStartEvent.bind(this)
    );
    this.renderer.xr.addEventListener(
      'sessionend',
      this.vrSessionEndEvent.bind(this)
    );
  }

  disconnect() {
    this.renderer.xr.removeEventListener(
      'sessionstart',
      this.vrSessionStartEvent.bind(this)
    );
    this.renderer.xr.removeEventListener(
      'sessionend',
      this.vrSessionEndEvent.bind(this)
    );
  }

  vrSessionStartEvent() {
    this.vrSessionStart.next();
  }

  vrSessionEndEvent() {
    this.vrSessionEnd.next();
  }

  ngOnDestroy() {
    this.disconnect();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
