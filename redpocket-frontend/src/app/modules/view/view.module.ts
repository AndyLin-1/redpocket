import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './view-routing.module';
import {ViewComponent} from "./view.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ViewComponent],
    imports: [
        CommonModule,
        ViewRoutingModule,
        ReactiveFormsModule
    ]
})
export class ViewModule { }
