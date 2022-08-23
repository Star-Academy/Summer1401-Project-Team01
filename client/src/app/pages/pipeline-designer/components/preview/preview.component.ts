import {Component, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {ColDef, GridApi, GridReadyEvent} from 'ag-grid-community';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
    @ViewChild(AgGridAngular) public agGrid!: AgGridAngular;

    private gridApi!: GridApi;
    public rowSelection: 'single' | 'multiple' = 'multiple';

    public columnDefs: ColDef[] = [
        {
            field: 'fileName',
        },
        {
            field: 'dataType',
        },
        {
            field: 'createdAt',
        },
    ];

    public defaultColDef: ColDef = {
        sortable: true,
        filter: true,
    };

    public rowData$: any[] = [];

    public constructor(private http: HttpClient) {}

    public onGridReady(params: GridReadyEvent): void {
        this.gridApi = params.api;
    }
}
