import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {ListOfItemsModule} from '../../components/list-of-items/list-of-items.module';
import {DragNDropModule} from '../../components/drag-n-drop/drag-n-drop.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ColumnTypesComponent} from './components/column-types/column-types.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataInventoryComponent} from './data-inventory.component';
import { ShowSampleComponent } from './components/show-sample/show-sample.component';
import {AgGridModule} from "ag-grid-angular";
import 'ag-grid-enterprise';

@NgModule({
    declarations: [DataInventoryComponent, ShowSampleComponent],
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
        AgGridModule,
    ],
})
export class DataInventoryModule {}
