import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddProcessorModalComponent} from './add-processor-modal.component';
import {MatDialogContent, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [],
    imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class AddProcessorModalModule {}
