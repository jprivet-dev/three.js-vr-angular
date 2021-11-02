import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { Container } from '@shared/threejs';
import { PlanetsService } from '../../services/planets.service';

@Component({
  selector: 'app-planets-page',
  templateUrl: './planets-page.component.html',
  styleUrls: ['./planets-page.component.scss'],
})
export class PlanetsPageComponent implements OnInit {
  @ViewChild('container') private containerRef!: ElementRef;

  constructor(
    private window: Window,
    private store: StoreService,
    private service: PlanetsService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const container = new Container(this.window, this.containerRef);
    this.service.buildScene(container);
  }
}
