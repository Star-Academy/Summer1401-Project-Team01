import {ChangeDetectorRef, Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-column-types',
    templateUrl: './column-types.component.html',
    styleUrls: ['./column-types.component.scss'],
})
export class ColumnTypesComponent {
    public str: string = 'string';

    public constructor(@Inject(MAT_DIALOG_DATA) public data: {columnTypes: string[]; columnTitles: string[]}, private cd: ChangeDetectorRef) {}

    public changeAllValues(value: string): void{

        for (let i = 0; i < this.data.columnTitles.length; i++) {
            this.data.columnTypes[i] = value;
            console.log(this.data.columnTypes[i] ,value);
        }
    }
}
