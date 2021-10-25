import { Component, OnInit } from '@angular/core';
import { TextureDef } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';

@Component({
  selector: 'app-button-texture-def',
  templateUrl: './button-texture-def.component.html',
  styleUrls: ['./button-texture-def.component.scss'],
})
export class ButtonTextureDefComponent implements OnInit {
  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  onChangeTextureDef(textureDef: TextureDef) {
    this.store.changeTextureDef(textureDef);
  }
}
