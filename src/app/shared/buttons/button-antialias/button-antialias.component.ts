import { Component, OnInit } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-button-antialias',
  templateUrl: './button-antialias.component.html',
  styleUrls: ['./button-antialias.component.scss'],
})
export class ButtonAntialiasComponent implements OnInit {
  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  active$(): Observable<boolean> {
    return this.store.antialias$.pipe(map((antialias) => antialias));
  }

  switchAntialias(): void {
    this.store.switchAntialias();
  }
}
