import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-column-types',
    templateUrl: './column-types.component.html',
    styleUrls: ['./column-types.component.scss'],
})
export class ColumnTypesComponent implements OnInit {
    public constructor(@Inject(MAT_DIALOG_DATA) public data: {columnTypes: string[]; columnTitles: string[]}) {}

    public ngOnInit(): void {
        for (let i = 0; i < this.data.columnTypes.length; i++) {
            this.data.columnTypes[i] = 'string';
        }
    }
}
