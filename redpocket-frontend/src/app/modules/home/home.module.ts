import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "./home.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        MatIconModule
    ]
})
export class HomeModule { }
