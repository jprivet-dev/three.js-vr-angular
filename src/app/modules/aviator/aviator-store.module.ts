import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AviatorReducer } from './store/reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(
      AviatorReducer.featureKey,
      AviatorReducer.reducer
    )
  ],
})
export class AviatorStoreModule {}
