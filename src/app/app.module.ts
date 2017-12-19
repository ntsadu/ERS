/*
This is the ROOT Module for ERS
Author: Nahom Tsadu
*/

//Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

//App Routes
import { appRoutes } from './app.routes';

//Primary App Service/Controller Injectable.. 
import { ERSController } from '../providers/ers-controller/ers-controller';

//Root Component
import { AppComponent } from './app.component';

//Supplement View Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';

import { NewRequestPage } from '../pages/employee-page/new-request/new-request';
import { PendingRequestsPage } from '../pages/employee-page/pending-requests/pending-requests';
import { PendingRequestsManagerPage } from '../pages/manager-page/pending-requests/pending-requests-manager';
import { ProcessedRequestsPage } from '../pages/employee-page/processed-requests/processed-request';
import { ProcessedRequestsManagerPage } from '../pages/manager-page/processed-requests/processed-requests-manager';


//Third Party Modules To Enhance UI/UX
import { SidebarModule } from 'ng-sidebar';
import { DataTableModule } from "angular2-datatable";
import { NgxPaginationModule } from 'ngx-pagination';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import "materialize-css";
import { MaterializeModule } from 'angular2-materialize';
import { MomentModule } from 'angular2-moment';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../pages/manager-page/pending-requests/pending-requests-manager';

@NgModule({
  declarations: [
    AppComponent,
    NewRequestPage,
    PendingRequestsPage,
    PendingRequestsManagerPage,
    DialogOverviewExampleDialog,
    ProcessedRequestsPage,
    ProcessedRequestsManagerPage,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    DashboardManagerComponent
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MomentModule,
    DataTableModule,
    NgxPaginationModule,
    MaterializeModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    SidebarModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ERSController],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
