import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanningPageComponent } from './scanning-page/scanning-page.component';

//Add routes here
const routes: Routes = [
  { path:  'scanning', component:  ScanningPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
