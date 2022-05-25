import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ScanningPageComponent } from './scanning-page/scanning-page.component';
import { ScannerRegistrationComponent } from './scanner-registration/scanner-registration.component';

//Add routes here
const routes: Routes = [
  { path:  '', component:  HomePageComponent},
  { path:  'scanning', component:  ScanningPageComponent},
  { path:  'scannerReg', component: ScannerRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
