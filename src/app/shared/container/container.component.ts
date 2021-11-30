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
import { Container } from './container';

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
    console.log('ContainerComponent | ngAfterViewInit');
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

      this.container.connectVRSessionEvents({
        start: () => {
          console.log('start');
          this.vrSessionStart.next();
        },
        end: () => {
          console.log('end');
          this.vrSessionEnd.next();
        },
      });

      this.containerInit.next(this.container);
    });
  }

  ngOnDestroy() {
    console.log('ContainerComponent | ngOnDestroy');
    if (this.subscription) {
      this.container.disconnectVRSessionEvents();
      this.subscription.unsubscribe();
    }
  }
}
