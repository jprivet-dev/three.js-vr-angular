import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsPageComponent } from './containers/planets-page/planets-page.component';

const ROUTES: Routes = [
  {
    path: '',
    component: PlanetsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class PlanetsRoutingModule {}
