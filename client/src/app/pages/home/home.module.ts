import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {ListOfItemsModule} from '../../components/list-of-items/list-of-items.module';
import {DragNDropModule} from '../../components/drag-n-drop/drag-n-drop.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ColumnTypesComponent} from './components/column-types/column-types.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        MatSliderModule,
        MatIconModule,
        ListOfItemsModule,
        DragNDropModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
    ],
})
export class HomeModule {}
