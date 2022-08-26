import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-column-types',
    templateUrl: './column-types.component.html',
    styleUrls: ['./column-types.component.scss'],
})
export class ColumnTypesComponent {
    public constructor(@Inject(MAT_DIALOG_DATA) public data: {columnTypes: string[]; columnTitles: string[]}) {}
}
