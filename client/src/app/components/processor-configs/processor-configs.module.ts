import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessorConfigsComponent} from './processor-configs.component';

@NgModule({
    declarations: [ProcessorConfigsComponent],
    exports: [ProcessorConfigsComponent],
    imports: [CommonModule],
})
export class ProcessorConfigsModule {}
