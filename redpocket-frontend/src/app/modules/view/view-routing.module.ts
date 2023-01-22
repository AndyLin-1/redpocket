import { NgModule } from '@angular/core';
import {ViewComponent} from "./view.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{path: "view/:id", component: ViewComponent}, {path: "view/:id/:code", component: ViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule { }
