import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';
import { CardComponent } from './card/card.component';
import { PickerComponent } from './picker/picker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverPageRoutingModule
  ],
  declarations: [DiscoverPage, CardComponent, PickerComponent]
})
export class DiscoverPageModule {}
