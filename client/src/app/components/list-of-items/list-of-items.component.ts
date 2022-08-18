import {Component, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {CellClickedEvent, ColDef, GridReadyEvent} from 'ag-grid-community';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-list-of-items',
    templateUrl: './list-of-items.component.html',
    styleUrls: ['./list-of-items.component.scss'],
})
export class ListOfItemsComponent {
    // Each Column Definition results in one Column.
    public columnDefs: ColDef[] = [
        {field: 'fileName', checkboxSelection: true},
        {field: 'dataType'},
        {field: 'createdAt'},
    ];

    // DefaultColDef sets props common to all Columns
    public defaultColDef: ColDef = {
        sortable: true,
        filter: true,
    };

    // Data that gets displayed in the grid
    public rowData$: any[] = [{fileName: 'covid', dataType: 'csv', createdAt: '2020'}];

    // For accessing the Grid's API
    @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

    public constructor(private http: HttpClient) {}

    // Example load data from sever
    public onGridReady(params: GridReadyEvent): void {}

    // Example of consuming Grid Event
    public onCellClicked(e: CellClickedEvent): void {
        console.log('cellClicked', e);
    }

    // Example using Grid's API
    public clearSelection(): void {
        this.agGrid.api.deselectAll();
    }
}
