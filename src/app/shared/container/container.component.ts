import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Container } from './container';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  @Input() stats$: Observable<boolean> = of(false);
  @Input() antialias$: Observable<boolean> = of(false);
  @Input() vrButtonEnable: boolean = false;

  @Output() containerInit = new EventEmitter<Container>();
  @Output() vrSessionStart = new EventEmitter<void>();
  @Output() vrSessionEnd = new EventEmitter<void>();

  @HostListener('window:resize') resize(): void {
    this.container.resize();
  }

  subscription = new Subscription();
  container!: Container;

  constructor(private elementRef: ElementRef, private window: Window) {}

  ngAfterViewInit(): void {
    this.container = new Container(
      this.window,
      this.elementRef.nativeElement,
      this.vrButtonEnable
    );

    this.subscription.add(
      this.antialias$.subscribe((antialias) =>
        this.forceCreateRenderer(antialias)
      )
    );

    // /!\ Stats subscription after Antialias subscription
    this.subscription.add(
      this.stats$.subscribe((stats) => this.container.updateStats(stats))
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.container.vrSession) {
      this.container.vrSession.disconnect();
    }
  }

  private forceCreateRenderer(antialias: boolean): void {
    this.container.createRenderer({
      antialias,
    });

    if (this.container.vrSession) {
      this.container.vrSession.connect({
        start: () => this.vrSessionStart.next(),
        end: () => this.vrSessionEnd.next(),
      });
    }

    this.containerInit.next(this.container);
  }
}
