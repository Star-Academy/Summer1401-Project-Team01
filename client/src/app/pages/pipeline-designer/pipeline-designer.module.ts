import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineDesignerComponent} from './pipeline-designer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SelectDatasetComponent} from './components/select-dataset/select-dataset.component';
import {AgGridModule} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {PreviewComponent} from './components/preview/preview.component';

@NgModule({
    declarations: [PipelineDesignerComponent, SelectDatasetComponent, PreviewComponent],
    imports: [CommonModule, MatDialogModule, AgGridModule],
    exports: [PipelineDesignerComponent],
})
export class PipelineDesignerModule {}
