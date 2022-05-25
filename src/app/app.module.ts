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
import { NavigationComponent } from './navigation/navigation.component';
import { NgbModule, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { BayManagementComponent } from './bay-management/bay-management.component';
import { BayManagementAddFormComponent } from './bay-management-add-form/bay-management-add-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavigationComponent,
    BayManagementComponent,
    BayManagementAddFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideDatabase(() => getDatabase()),
    NgbModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgbOffcanvasModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
