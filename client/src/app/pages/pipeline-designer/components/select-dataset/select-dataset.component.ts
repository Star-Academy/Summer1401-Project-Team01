import {Component, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {CellClassParams, ColDef, GridApi, GridReadyEvent, ICellRendererParams} from 'ag-grid-community';
import {HttpClient} from '@angular/common/http';
import {DatasetService} from '../../../../services/api/dataset.service';
import {DiagramNodeService} from '../../../../services/diagram-node.service';
import {PIPELINE_ADD_DESTINATION, PIPELINE_ADD_SOURCE} from '../../../../utilities/urls';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-select-dataset',
    templateUrl: './select-dataset.component.html',
    styleUrls: ['./select-dataset.component.scss'],
})
export class SelectDatasetComponent implements OnInit {
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
        private diagramNodeService: DiagramNodeService
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
        console.log(this.rowData$);
    }

    public async selectDataset(): Promise<void> {
        const selectedData = this.gridApi.getSelectedRows();
        const fileName = selectedData[0].fileName;

        const formDataForSrcDes = new FormData();

        if (this.diagramNodeService.selectedNode?.type === 'Start') {
            formDataForSrcDes.append('sourceName', fileName);
            formDataForSrcDes.append('pipelineName', this.diagramNodeService.pipelinePage);
            formDataForSrcDes.append('username', 'admin');

            await fetch(PIPELINE_ADD_SOURCE, {
                method: 'post',
                body: formDataForSrcDes,
            });
        } else if (this.diagramNodeService.selectedNode?.type === 'Destination') {
            formDataForSrcDes.append('destinationName', fileName);
            formDataForSrcDes.append('pipelineName', this.diagramNodeService.pipelinePage);
            formDataForSrcDes.append('username', 'admin');

            await fetch(PIPELINE_ADD_DESTINATION, {
                method: 'post',
                body: formDataForSrcDes,
            });
        }
    }
}
