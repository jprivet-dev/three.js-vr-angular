import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { Container } from '@shared/threejs/containers';
import { EarthService } from '../../services/earth.service';

@Component({
  selector: 'app-earth-page',
  templateUrl: './earth-page.component.html',
  styleUrls: ['./earth-page.component.scss'],
})
export class EarthPageComponent implements OnInit {
  @ViewChild('container') private containerRef!: ElementRef;

  constructor(
    private window: Window,
    private store: StoreService,
    private service: EarthService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const container = new Container(this.window, this.containerRef);
    this.service.buildScene(container);
  }
}
