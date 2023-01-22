import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ViewModule} from "./modules/view/view.module";
import {HttpClientModule} from "@angular/common/http";
import {HomeModule} from "./modules/home/home.module";
import {HeaderComponent} from "./core/component/header/header.component";
import { AboutComponent } from './modules/about/about.component';
import {AboutModule} from "./modules/about/about.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './core/component/footer/footer.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ViewModule,
    HomeModule,
    AboutModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
