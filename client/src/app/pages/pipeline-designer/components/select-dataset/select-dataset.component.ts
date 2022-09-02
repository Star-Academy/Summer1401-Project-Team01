import {Component, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {CellClassParams, ColDef, GridApi, GridReadyEvent, ICellRendererParams} from 'ag-grid-community';
import {HttpClient} from '@angular/common/http';
import {DatasetService} from '../../../../services/api/dataset.service';
import {DiagramNodeService} from '../../../../services/diagram-node.service';
import {
    PIPELINE_ADD_DESTINATION,
    PIPELINE_ADD_SOURCE,
    PIPELINE_REMOVE_DESTINATION,
    PIPELINE_REMOVE_SOURCE,
} from '../../../../utilities/urls';
import {ActivatedRoute} from '@angular/router';
import {snackbarType} from '../../../../models/snackbar-type.enum';
import {SnackbarService} from '../../../../services/snackbar.service';

@Component({
    selector: 'app-select-dataset',
    templateUrl: './select-dataset.component.html',
    styleUrls: ['./select-dataset.component.scss'],
})
export class SelectDatasetComponent implements OnInit {
    @ViewChild(AgGridAngular) public agGrid!: AgGridAngular;

    private gridApi!: GridApi;
    public rowSelection: 'single' | 'multiple' = 'single';
    public isSelected: boolean = false;
    public isInDestination: boolean = false;
    public fileName: string = '';
    public isUnique: boolean = false;
    public disableContinue: boolean = true;

    public columnDefs: ColDef[] = [
        {
            field: 'fileName',
            headerName: 'Your Datasets',
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

    public constructor(
        private http: HttpClient,
        private datasetService: DatasetService,
        private diagramNodeService: DiagramNodeService,
        private dataset: DatasetService,
        private snackbar: SnackbarService
    ) {}

    public onGridReady(params: GridReadyEvent): void {
        this.gridApi = params.api;
    }

    public async ngOnInit(): Promise<void> {
        let data = await this.datasetService.getDatasets();
        let newRowData = [];

        for (let i = 0; i < data.length; i++) {
            newRowData.push({fileName: data[i], dataType: 'csv'});
        }
        this.gridApi.setRowData(newRowData);

        if (this.diagramNodeService.selectedNode?.type === 'Destination') this.isInDestination = true;
    }

    public validateSelectButton(): void {
        const selectedData = this.gridApi.getSelectedRows();
        if (selectedData[0]) this.isSelected = true;
        else this.isSelected = false;
    }

    public async selectDataset(): Promise<void> {
        const selectedData = this.gridApi.getSelectedRows();
        const fileName = selectedData[0].fileName;

        const formDataForSrcDes = new FormData();

        if (this.diagramNodeService.nodeSelection === 'start') {
            this.diagramNodeService.source = fileName;

            formDataForSrcDes.append('sourceName', fileName);
            formDataForSrcDes.append('pipelineName', this.diagramNodeService.pipelinePage);
            formDataForSrcDes.append('username', 'admin');

            const response = await fetch(PIPELINE_ADD_SOURCE, {
                method: 'post',
                body: formDataForSrcDes,
            });

            if (response.ok) this.diagramNodeService.isSourceSelected = true;
        } else if (this.diagramNodeService.nodeSelection === 'destination') {
            formDataForSrcDes.append('destinationName', fileName);
            formDataForSrcDes.append('pipelineName', this.diagramNodeService.pipelinePage);
            formDataForSrcDes.append('username', 'admin');

            const response = await fetch(PIPELINE_ADD_DESTINATION, {
                method: 'post',
                body: formDataForSrcDes,
            });

            if (response.ok) this.diagramNodeService.isDestinationSelected = true;
        }
    }

    public async validateContinue(): Promise<void> {
        await this.checkUnique();
        if (this.fileName !== '' && this.isUnique) {
            this.disableContinue = false;
        } else {
            this.disableContinue = true;
        }
    }

    public async checkUnique(): Promise<void> {
        const fileNames = await this.dataset.getDatasets();
        console.log(fileNames);
        for (let i = 0; i < fileNames.length; i++) {
            if (fileNames[i] === this.fileName) {
                this.isUnique = false;
                this.snackbar.show('Enter a Unique Name', snackbarType.WARNING);
                break;
            } else {
                this.isUnique = true;
            }
        }
    }

    public async createNewFile() {
        await this.dataset.createNew(this.fileName);
        this.gridApi.applyTransaction({add: [{fileName: this.fileName}]});
    }
}
