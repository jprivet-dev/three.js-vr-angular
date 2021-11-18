import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PlanetsReducer } from './store/reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(
      PlanetsReducer.featureKey,
      PlanetsReducer.reducer
    )
  ],
})
export class PlanetsStoreModule {}
