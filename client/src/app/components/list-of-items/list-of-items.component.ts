import {Component, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {
    CellClassParams,
    CellClickedEvent,
    ColDef,
    GridApi,
    GridReadyEvent,
    ICellRendererParams,
} from 'ag-grid-community';
import {HttpClient} from '@angular/common/http';
import {DatasetService} from '../../services/api/dataset.service';
import {ShowSampleComponent} from "../../pages/data-inventory/components/show-sample/show-sample.component";
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from "../../services/snackbar.service";
import {snackbarType} from "../../models/snackbar-type.enum";

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
            headerName: 'Your Datasets',
            headerTooltip: 'double click to edit',
            editable: true,
            checkboxSelection: true,
            headerCheckboxSelection: false,
            headerCheckboxSelectionFilteredOnly: false,
            flex: 1,
        },
        {
            field: 'dataType',
            headerName: 'Dataset Type',
            maxWidth: 170,
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

    public constructor(private http: HttpClient, private datasetService: DatasetService, public dialog: MatDialog, private snackbar: SnackbarService) {
    }

    public async ngOnInit(): Promise<void> {
        let data = await this.datasetService.getDatasets();
        let newRowData = [];

        for (let i = 0; i < data.length; i++) {
            newRowData.push({fileName: data[i], dataType: 'csv'});
        }
        this.gridApi.setRowData(newRowData);
        console.log(this.rowData$);
    }

    public onRemoveSelected(): void {
        const selectedData = this.gridApi.getSelectedRows();
        if (selectedData[0]) {
            this.datasetService.deleteDataset(selectedData[0].fileName);
            this.gridApi.applyTransaction({remove: selectedData});
        } else this.snackbar.show("You must select a file first", snackbarType.WARNING);
    }

    public async downloadSelected(): Promise<void> {
        const selectedData = this.gridApi.getSelectedRows();
        if (selectedData[0]) await this.datasetService.getDownloadDataset(selectedData[0].fileName);
        else this.snackbar.show("You must select a file first", snackbarType.WARNING);

    }

    public async viewDataset(): Promise<void> {
        const selectedData = this.gridApi.getSelectedRows();
        if (selectedData[0]) {
            const sampleData = await this.datasetService.getRecords(selectedData[0].fileName, 50);

            const dialogRef = this.dialog.open(ShowSampleComponent, {
                data: {sampleData: sampleData},
            });
        } else this.snackbar.show("You must select a file first", snackbarType.WARNING);
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

    public async updateGrid(fileName: string): Promise<void> {
        let data = await this.datasetService.getDatasets();

        this.gridApi.applyTransaction({add: [{fileName: fileName, dataType: 'csv'}]});

        }
}
