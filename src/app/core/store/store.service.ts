import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TextureDef } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _textureDef = new BehaviorSubject<TextureDef>('sd');
  public textureDef$ = this._textureDef.asObservable();

  changeTextureDef(textureDef: TextureDef) {
    this._textureDef.next(textureDef);
  }

  constructor() {}
}
