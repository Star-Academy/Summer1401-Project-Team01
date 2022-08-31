import { Component} from '@angular/core';
import {PipelineService} from "../../../../services/api/pipeline.service";

@Component({
  selector: 'app-create-pipeline',
  templateUrl: './create-pipeline.component.html',
  styleUrls: ['./create-pipeline.component.scss']
})
export class CreatePipelineComponent {
  public pipelineName: string = '';
  public disableContinue: boolean = true;

  public constructor(private pipelineService: PipelineService) {
  }


  public validateContinue(): void {
    if (this.pipelineName !== '') {
      this.disableContinue = false;
    } else {
      this.disableContinue = true;
    }

  }

  public createPipeline(): void {
    this.pipelineService.createPipeline(this.pipelineName);
  }

}
