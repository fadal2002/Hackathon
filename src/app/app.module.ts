import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { MainPageComponent } from './main-page/main-page.component';
import { ScanningPageComponent } from './scanning-page/scanning-page.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NavigationComponent } from './navigation/navigation.component';
import { NgbDropdownModule, NgbModule, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { BayManagementComponent } from './bay-management/bay-management.component';
import { BayManagementAddFormComponent } from './bay-management-add-form/bay-management-add-form.component';
import { ScannerRegistrationComponent } from './scanner-registration/scanner-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { DxDataGridModule, DxDropDownBoxModule, DxDropDownButtonModule, DxListModule, DxPieChartModule, DxTemplateModule, DxTreeViewComponent, DxTreeViewModule } from 'devextreme-angular';
import {MatSelectModule} from '@angular/material/select';
import { NotificationComponent } from './notification/notification.component';
import { NotificationSystemComponent } from './notification-system/notification-system.component'

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavigationComponent,
    BayManagementComponent,
    BayManagementAddFormComponent,
    ScanningPageComponent,
    ScannerRegistrationComponent,
    HomePageComponent,
    NotificationComponent,
    NotificationSystemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ZXingScannerModule,
    FormsModule,
    DxPieChartModule,
    provideDatabase(() => getDatabase()),
    NgbModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgbOffcanvasModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    DxDropDownBoxModule,
    DxTemplateModule,
    DxDropDownButtonModule,
    DxTreeViewModule,
    DxDataGridModule,
    DxListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
