import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineDesignerComponent} from './pipeline-designer.component';
import {NgFlowchartModule} from '@joelwenzel/ng-flowchart';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    declarations: [PipelineDesignerComponent],
    imports: [CommonModule, NgFlowchartModule, MatDialogModule],
    exports: [PipelineDesignerComponent],
})
export class PipelineDesignerModule {}
