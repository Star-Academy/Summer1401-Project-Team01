import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineListComponent} from './pipeline-list.component';
import {ListOfPipelinesComponent} from './components/list-of-pipelines/list-of-pipelines.component';
import {AgGridModule} from 'ag-grid-angular';
import {RouterModule} from "@angular/router";
import { CreatePipelineComponent } from './components/create-pipeline/create-pipeline.component';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    declarations: [PipelineListComponent, ListOfPipelinesComponent, CreatePipelineComponent],
    imports: [CommonModule, AgGridModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule],
})
export class PipelineListModule {}
