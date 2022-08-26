import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListOfItemsComponent} from './list-of-items.component';
import {AgGridModule} from 'ag-grid-angular';

@NgModule({
    declarations: [ListOfItemsComponent],
    imports: [CommonModule, AgGridModule],
    exports: [ListOfItemsComponent],
})
export class ListOfItemsModule {}
