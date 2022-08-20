import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineDesignerComponent} from './pipeline-designer.component';
import {NgFlowchartModule} from '@joelwenzel/ng-flowchart';

@NgModule({
    declarations: [PipelineDesignerComponent],
    imports: [CommonModule, NgFlowchartModule],
    exports: [PipelineDesignerComponent],
})
export class PipelineDesignerModule {}
