import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeJsPageComponent } from '@modules/three-js/containers/three-js-page/three-js-page.component';

const routes: Routes = [
  {
    path: 'earth',
    loadChildren: () =>
      import('./modules/earth/earth.module').then((m) => m.EarthModule),
  },
  {
    path: 'old-earth',
    component: ThreeJsPageComponent,
  },
  {
    path: '**',
    redirectTo: 'earth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
