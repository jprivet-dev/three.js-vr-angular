import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EarthPageComponent } from './containers/earth-page/earth-page.component';
import { EarthRoutingModule } from './earth-routing.module';

@NgModule({
  declarations: [EarthPageComponent],
  imports: [CommonModule, EarthRoutingModule],
})
export class EarthModule {}
