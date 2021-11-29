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
import { Container } from '../threejs/containers';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') private containerRef!: ElementRef;

  @Input() antialias$: Observable<boolean> = of(false);
  @Input() vrButton: boolean = false;
  @Input() statsEnable: boolean = false;

  @Output() containerInit = new EventEmitter<Container>();
  @Output() vrSessionStart = new EventEmitter<void>();
  @Output() vrSessionEnd = new EventEmitter<void>();

  subscription!: Subscription;
  container!: Container;

  constructor(private window: Window) {}

  ngAfterViewInit(): void {
    this.container = new Container(
      this.window,
      this.containerRef,
      this.vrButton,
      this.statsEnable
    );

    this.subscription = this.antialias$.subscribe((antialias) => {
      this.container.createRenderer({
        antialias,
      });

      this.containerInit.next(this.container);
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
