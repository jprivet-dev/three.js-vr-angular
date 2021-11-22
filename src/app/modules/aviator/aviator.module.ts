import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AviatorPageComponent } from './containers/aviator-page/aviator-page.component';
import { AviatorRoutingModule } from './aviator-routing.module';
import { AviatorStoreModule } from './aviator-store.module';

@NgModule({
  declarations: [AviatorPageComponent],
  imports: [CommonModule, SharedModule, AviatorRoutingModule, AviatorStoreModule],
})
export class AviatorModule {}
