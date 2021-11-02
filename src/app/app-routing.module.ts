import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'earth',
    loadChildren: () =>
      import('./modules/earth/earth.module').then((m) => m.EarthModule),
  },
  {
    path: 'planets',
    loadChildren: () =>
      import('./modules/planets/planets.module').then((m) => m.PlanetsModule),
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
