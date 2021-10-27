import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarthPageComponent } from './containers/earth-page/earth-page.component';

const ROUTES: Routes = [
  {
    path: '',
    component: EarthPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class EarthRoutingModule {}
