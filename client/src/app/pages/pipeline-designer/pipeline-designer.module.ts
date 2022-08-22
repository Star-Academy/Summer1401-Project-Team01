import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineDesignerComponent} from './pipeline-designer.component';
import {NgFlowchartModule} from '@joelwenzel/ng-flowchart';
import {MatDialogModule} from '@angular/material/dialog';
import {SelectDatasetComponent} from './components/select-dataset/select-dataset.component';
import {AgGridModule} from 'ag-grid-angular';
import 'ag-grid-enterprise';

@NgModule({
    declarations: [PipelineDesignerComponent, SelectDatasetComponent],
    imports: [CommonModule, NgFlowchartModule, MatDialogModule, AgGridModule],
    exports: [PipelineDesignerComponent],
})
export class PipelineDesignerModule {}
