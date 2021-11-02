import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/homepage/homepage.module').then((m) => m.HomepageModule),
  },
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
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
