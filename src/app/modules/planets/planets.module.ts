import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PlanetsPageComponent } from './containers/planets-page/planets-page.component';
import { PlanetsRoutingModule } from './planets-routing.module';

@NgModule({
  declarations: [PlanetsPageComponent],
  imports: [CommonModule, SharedModule, PlanetsRoutingModule],
})
export class PlanetsModule {}
