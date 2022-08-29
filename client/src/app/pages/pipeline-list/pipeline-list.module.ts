import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineListComponent} from './pipeline-list.component';
import {ListOfPipelinesComponent} from './components/list-of-pipelines/list-of-pipelines.component';
import {AgGridModule} from 'ag-grid-angular';

@NgModule({
    declarations: [PipelineListComponent, ListOfPipelinesComponent],
    imports: [CommonModule, AgGridModule],
})
export class PipelineListModule {}
