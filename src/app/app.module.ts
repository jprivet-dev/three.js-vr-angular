import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { windowProvider } from '@core/window/window.provider';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AppStoreModule],
  providers: [windowProvider],
  bootstrap: [AppComponent],
})
export class AppModule {
}
