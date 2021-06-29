import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WellListComponent } from './well-list/well-list.component';

const routes: Routes = [
  {
    path: '',
    component: WellListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
