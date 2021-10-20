import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { windowProvider } from '@core/window/window.provider';
import { ThreeJsModule } from '@modules/three-js/three-js.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ThreeJsModule],
  providers: [windowProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
