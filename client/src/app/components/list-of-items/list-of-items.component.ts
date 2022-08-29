import {ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {
    CellClassParams,
    CellClickedEvent,
    ColDef,
    GridReadyEvent,
    GridApi,
    ICellRendererParams,
} from 'ag-grid-community';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DatasetService} from "../../services/api/dataset.service";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";

@Component({
    selector: 'app-list-of-items',
    templateUrl: './list-of-items.component.html',
    styleUrls: ['./list-of-items.component.scss'],
})
export class ListOfItemsComponent implements OnInit {
    @ViewChild(AgGridAngular) public agGrid!: AgGridAngular;

    private gridApi!: GridApi;
    public rowSelection: 'single' | 'multiple' = 'multiple';

    public columnDefs: ColDef[] = [
        {
            field: 'fileName',
            headerTooltip: 'double click to edit',
            editable: true,
            checkboxSelection: true,
            headerCheckboxSelection: false,
            headerCheckboxSelectionFilteredOnly: false,
            flex: 1,
        },
        {
            field: 'dataType',
            maxWidth: 150,
            cellClass: (params: CellClassParams): string => {
                return ListOfItemsComponent.determineFileType(params);
            },
            cellRenderer: (params: ICellRendererParams): string => {
                return ListOfItemsComponent.spanMaker(params);
            },
        },
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

    public rowData$: any[] = [];

    public constructor(private http: HttpClient, private datasetService: DatasetService) {}

    public async ngOnInit(): Promise<void> {
        let data = await this.datasetService.getDatasets();
        let newRowData = []

        for (let i = 0; i < data.length; i++) {
            newRowData.push({fileName: data[i], dataType: 'csv'})
        }
        this.gridApi.setRowData(newRowData);
        console.log(this.rowData$)
    }

    public onRemoveSelected(): void {
        const selectedData = this.gridApi.getSelectedRows();
        this.datasetService.deleteDataset(selectedData[0].fileName)
        this.gridApi.applyTransaction({remove: selectedData});
    }

    public downloadSelected(): void {
        const selectedData = this.gridApi.getSelectedRows();
        const downloadUrl = this.datasetService.getDownloadDataset(selectedData[0].fileName)
        console.log(downloadUrl)
        //this.datasetService.downloadDataset(downloadUrl)
    }

    public clearData(): void {
        this.gridApi.setRowData([]);

    }

    public onGridReady(params: GridReadyEvent): void {
        this.gridApi = params.api;
    }

    public onCellClicked(e: CellClickedEvent): void {
        console.log('cellClicked', e);
    }
}
