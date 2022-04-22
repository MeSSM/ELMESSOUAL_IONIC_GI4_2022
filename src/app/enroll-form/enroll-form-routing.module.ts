import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnrollFormPage } from './enroll-form.page';

const routes: Routes = [
  {
    path: '',
    component: EnrollFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrollFormPageRoutingModule {}
