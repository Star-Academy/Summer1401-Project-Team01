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
import {DatasetService} from '../../../../services/api/dataset.service';
import {PipelineService} from '../../../../services/api/pipeline.service';
import {RouterLinkRendererComponent} from '../../../../components/router-link-renderer/router-link-renderer';

@Component({
    selector: 'app-list-of-pipelines',
    templateUrl: './list-of-pipelines.component.html',
    styleUrls: ['./list-of-pipelines.component.scss'],
})
export class ListOfPipelinesComponent implements OnInit {
    @ViewChild(AgGridAngular) public agGrid!: AgGridAngular;

    private gridApi!: GridApi;
    public rowSelection: 'single' | 'multiple' = 'multiple';

    public columnDefs: ColDef[] = [
        {
            field: 'pipelines',
            headerTooltip: 'double click to edit',
            editable: true,
            checkboxSelection: true,
            headerCheckboxSelection: false,
            headerCheckboxSelectionFilteredOnly: false,
            flex: 1,
            cellRendererFramework: RouterLinkRendererComponent,
            cellRendererParams: {
                inRouterLink: '/pipeline-designer',
            },
        },
    ];

    private static linkMaker(params: ICellRendererParams): string {
        return '<a href="https://www.google.com">' + params.value + '</a>';
    }

    public defaultColDef: ColDef = {
        sortable: true,
        filter: true,
    };

    public rowData$: any[] = [];

    public constructor(private http: HttpClient, private pipelineService: PipelineService) {}

    public async ngOnInit(): Promise<void> {
        let data = await this.pipelineService.getAllPipelineNames();
        let newRowData = [];

        for (let i = 0; i < data.length; i++) {
            newRowData.push({pipelines: data[i]});
        }
        this.gridApi.setRowData(newRowData);
        console.log(this.rowData$);
    }

    public onRemoveSelected(): void {
        const selectedData = this.gridApi.getSelectedRows();
    }

    public downloadSelected(): void {}

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
