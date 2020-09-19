import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnrolleeListComponent } from './component/enrolle-list/enrollee-list.component';

const routes: Routes = [
  {
    path: 'enrollee-list',
    component: EnrolleeListComponent
  },
  {
    path: '',
    redirectTo: '/enrollee-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
