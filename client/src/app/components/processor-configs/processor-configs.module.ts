import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessorConfigsComponent} from './processor-configs.component';
import {ConfigSelectComponent} from './config-components/config-select/config-select.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ConfigToggleComponent} from './config-components/config-toggle/config-toggle.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    declarations: [ProcessorConfigsComponent, ConfigSelectComponent, ConfigToggleComponent],
    exports: [ProcessorConfigsComponent],
    imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatSlideToggleModule],
})
export class ProcessorConfigsModule {}
