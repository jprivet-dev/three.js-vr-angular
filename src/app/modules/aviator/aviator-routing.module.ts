import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AviatorPageComponent } from './containers/aviator-page/aviator-page.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AviatorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AviatorRoutingModule {}
