import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {ColDef, GridApi, GridReadyEvent} from 'ag-grid-community';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DatasetService} from '../../../../services/api/dataset.service';
import {DiagramNodeService} from '../../../../services/diagram-node.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
    @ViewChild(AgGridAngular) public agGrid!: AgGridAngular;

    private gridApi!: GridApi;

    public constructor(private dataset: DatasetService, private diagramNodeService: DiagramNodeService) {}

    public columnDefs: ColDef[] = [];
    public defaultColDef: ColDef = {
        sortable: true,
        filter: true,
    };
    public rowData$: any[] = [];

    public async ngOnInit(): Promise<void> {
        console.log(this.diagramNodeService.selectedNodeData?.key)
        if (!this.diagramNodeService.selectedNodeData?.key) return;
        const data = await this.dataset.getPreview(
            this.diagramNodeService.pipelinePage,
            this.diagramNodeService.selectedNodeData?.key
        );
        this.columnDefs = Object.keys(await data[0]).map((x) => {
            return {field: x};
        });
        console.log(data);
        this.rowData$ = data;
        //
    }
}
