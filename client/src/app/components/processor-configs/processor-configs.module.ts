import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessorConfigsComponent} from './processor-configs.component';
import {ConfigSelectComponent} from './config-components/config-select/config-select.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ConfigToggleComponent} from './config-components/config-toggle/config-toggle.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ConfigInputComponent} from './config-components/config-input/config-input.component';
import {MatInputModule} from '@angular/material/input';
import { ConfigNumberInputComponent } from './config-components/config-number-input/config-number-input.component';

@NgModule({
    declarations: [ProcessorConfigsComponent, ConfigSelectComponent, ConfigToggleComponent, ConfigInputComponent, ConfigNumberInputComponent],
    exports: [ProcessorConfigsComponent],
    imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatSlideToggleModule, MatInputModule],
})
export class ProcessorConfigsModule {}
