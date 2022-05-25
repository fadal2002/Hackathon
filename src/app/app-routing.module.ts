import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BayManagementComponent } from './bay-management/bay-management.component';
import { ScanningPageComponent } from './scanning-page/scanning-page.component';

//Add routes here
const routes: Routes = [
  { path: '', component: BayManagementComponent},
  { path:  'scanning', component:  ScanningPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
