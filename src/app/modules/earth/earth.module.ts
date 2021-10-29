import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EarthPageComponent } from './containers/earth-page/earth-page.component';
import { EarthRoutingModule } from './earth-routing.module';

@NgModule({
  declarations: [EarthPageComponent],
  imports: [CommonModule, SharedModule, EarthRoutingModule],
})
export class EarthModule {}
