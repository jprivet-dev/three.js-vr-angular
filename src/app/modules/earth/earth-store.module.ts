import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EarthReducer } from './store/reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(
      EarthReducer.featureKey,
      EarthReducer.reducer
    )
  ],
})
export class EarthStoreModule {}
