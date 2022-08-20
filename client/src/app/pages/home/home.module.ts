import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {ListOfItemsModule} from '../../components/list-of-items/list-of-items.module';
import {DragNDropModule} from '../../components/drag-n-drop/drag-n-drop.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, MatSliderModule, MatIconModule, ListOfItemsModule, DragNDropModule],
})
export class HomeModule {}
