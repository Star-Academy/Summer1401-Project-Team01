import {Component, Inject} from '@angular/core';
import {PipelineService} from '../../../../services/api/pipeline.service';
import {snackbarType} from '../../../../models/snackbar-type.enum';
import {SnackbarService} from '../../../../services/snackbar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PipelineValueService} from '../../../../services/pipeline-value.service';

@Component({
    selector: 'app-create-pipeline',
    templateUrl: './create-pipeline.component.html',
    styleUrls: ['./create-pipeline.component.scss'],
})
export class CreatePipelineComponent {
    public pipelineName: string = '';
    public disableContinue: boolean = true;
    public isUnique: boolean = false;

    public constructor(
        private pipelineService: PipelineService,
        private snackbar: SnackbarService,
        public dialogRef: MatDialogRef<CreatePipelineComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
        private pipelineValueService: PipelineValueService
    ) {}

    public async validateContinue(): Promise<void> {
        await this.checkUnique();

        if (this.pipelineName !== '' && this.isUnique) {
            this.disableContinue = false;
        } else {
            this.disableContinue = true;
        }
    }

    public async checkUnique(): Promise<void> {
        const pipeNames = await this.pipelineService.getAllPipelineNames();
        for (let i = 0; i < pipeNames.length; i++) {
            if (pipeNames[i] === this.pipelineName) {
                this.isUnique = false;
                this.snackbar.show('Enter a Unique Name', snackbarType.WARNING);
                break;
            } else {
                this.isUnique = true;
            }
        }
    }

    public async createPipeline(): Promise<void> {
        await this.pipelineService.createPipeline(this.pipelineName);
        this.pipelineValueService.pipelineName = this.pipelineName;
    }
}
