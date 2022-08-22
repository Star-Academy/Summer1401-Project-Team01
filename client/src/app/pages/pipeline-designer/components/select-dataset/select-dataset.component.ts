import {Component, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {CellClassParams, ColDef, GridApi, GridReadyEvent, ICellRendererParams} from 'ag-grid-community';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-select-dataset',
    templateUrl: './select-dataset.component.html',
    styleUrls: ['./select-dataset.component.scss'],
})
export class SelectDatasetComponent {
    @ViewChild(AgGridAngular) public agGrid!: AgGridAngular;

    private gridApi!: GridApi;
    public rowSelection: 'single' | 'multiple' = 'single';

    public columnDefs: ColDef[] = [
        {
            field: 'fileName',
            checkboxSelection: true,
            flex: 1,
        },
        {
            field: 'dataType',
            maxWidth: 150,
            cellClass: (params: CellClassParams): string => {
                return SelectDatasetComponent.determineFileType(params);
            },
            cellRenderer: (params: ICellRendererParams): string => {
                return SelectDatasetComponent.spanMaker(params);
            },
        },
        {field: 'createdAt'},
    ];

    private static determineFileType(params: CellClassParams): string {
        switch (params.value) {
            case 'csv':
                return 'csv';
            case 'xls':
                return 'xls';
            case 'json':
                return 'json';
            default:
                return 'unknown';
        }
    }

    private static spanMaker(params: ICellRendererParams): string {
        return '<span class="border-element">' + params.value + '</span>';
    }

    public defaultColDef: ColDef = {
        sortable: true,
        filter: true,
    };

    public rowData$: any[] = [
        {fileName: 'covid', dataType: 'csv', createdAt: '2022-8-18'},
        {fileName: 'فایل_توزیع_واکسیناسیون_کرونا', dataType: 'xls', createdAt: '2022-2-12'},
        {fileName: '653223file_91covid19_extra', dataType: 'xls', createdAt: '2020-5-05'},
        {fileName: 'فایل_واکسنهای_موجود', dataType: 'json', createdAt: '2022-8-17'},
        {fileName: 'لیست_بیماری_های_واگیردار', dataType: 'csv', createdAt: '2002-12-25'},
        {fileName: 'covid', dataType: 'csv', createdAt: '2022-8-18'},
        {fileName: 'فایل_توزیع_واکسیناسیون_کرونا', dataType: 'xls', createdAt: '2022-2-12'},
        {fileName: '653223file_91covid19_extra', dataType: 'xls', createdAt: '2020-5-05'},
        {fileName: 'فایل_واکسنهای_موجود', dataType: 'json', createdAt: '2022-8-17'},
        {fileName: 'لیست_بیماری_های_واگیردار', dataType: 'csv', createdAt: '2002-12-25'},
    ];

    public constructor(private http: HttpClient) {}

    public onGridReady(params: GridReadyEvent): void {
        this.gridApi = params.api;
    }
}
