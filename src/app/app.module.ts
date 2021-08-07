import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {DashboardService} from "./services/dashboard.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [] },
  ];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
    ],
    exports: [RouterModule],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
