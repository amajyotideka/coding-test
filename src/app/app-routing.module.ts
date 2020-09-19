import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnrolleListComponent } from './component/enrolle-list/enrolle-list.component';

const routes: Routes = [
  {
    path: 'enrollee-list',
    component: EnrolleListComponent
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
