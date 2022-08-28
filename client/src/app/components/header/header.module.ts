import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './header.component';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatListModule,
        MatSelectModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [HeaderComponent],
})
export class HeaderModule {}
