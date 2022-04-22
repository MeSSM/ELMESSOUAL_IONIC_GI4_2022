import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollFormPageRoutingModule } from './enroll-form-routing.module';

import { EnrollFormPage } from './enroll-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnrollFormPageRoutingModule
  ],
  declarations: [EnrollFormPage]
})
export class EnrollFormPageModule {}
