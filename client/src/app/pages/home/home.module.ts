import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, MatSliderModule, MatIconModule],
})
export class HomeModule {}
