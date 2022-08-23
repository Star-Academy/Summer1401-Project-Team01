import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessorConfigsComponent} from './processor-configs.component';
import {ConfigSelectComponent} from './config-components/config-select/config-select.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [ProcessorConfigsComponent, ConfigSelectComponent],
    exports: [ProcessorConfigsComponent],
    imports: [CommonModule, MatFormFieldModule, MatSelectModule],
})
export class ProcessorConfigsModule {}
