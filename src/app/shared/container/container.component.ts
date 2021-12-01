import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output,
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Container } from './container';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  @Input() antialias$: Observable<boolean> = of(false);
  @Input() vrButton: boolean = false;
  @Input() statsEnable: boolean = false;

  @Output() containerInit = new EventEmitter<Container>();
  @Output() vrSessionStart = new EventEmitter<void>();
  @Output() vrSessionEnd = new EventEmitter<void>();

  @HostListener('window:resize')
  resize(): void {
    this.container.resize();
  }

  subscription!: Subscription;
  container!: Container;

  constructor(private elementRef: ElementRef, private window: Window) {}

  ngAfterViewInit(): void {
    this.container = new Container(
      this.window,
      this.elementRef.nativeElement,
      this.vrButton,
      this.statsEnable
    );

    this.subscription = this.antialias$.subscribe((antialias) => {
      this.container.createRenderer({
        antialias,
      });

      this.container.connectVRSessionEvents({
        start: () => this.vrSessionStart.next(),
        end: () => this.vrSessionEnd.next(),
      });

      this.containerInit.next(this.container);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.container.disconnectVRSessionEvents();
  }
}
