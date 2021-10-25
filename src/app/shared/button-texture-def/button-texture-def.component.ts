import { Component, OnInit } from '@angular/core';
import { TextureDef } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-button-texture-def',
  templateUrl: './button-texture-def.component.html',
  styleUrls: ['./button-texture-def.component.scss'],
})
export class ButtonTextureDefComponent implements OnInit {
  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  active$(textureDef: TextureDef): Observable<boolean> {
    return this.store.textureDef$.pipe(
      map((currentTextureDev) => currentTextureDev === textureDef)
    );
  }

  onChangeTextureDef(textureDef: TextureDef): void {
    this.store.changeTextureDef(textureDef);
  }
}
