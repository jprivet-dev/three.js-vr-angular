import { Component, OnInit } from '@angular/core';
import { Definition } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-button-definition',
  templateUrl: './button-definition.component.html',
  styleUrls: ['./button-definition.component.scss'],
})
export class ButtonDefinitionComponent implements OnInit {
  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  active$(definition: Definition): Observable<boolean> {
    return this.store.definition$.pipe(
      map((currentTextureDev) => currentTextureDev === definition)
    );
  }

  onChangeDefinition(definition: Definition): void {
    this.store.changeDefinition(definition);
  }
}
