import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanvasDiagramComponent} from './canvas-diagram.component';
import {DiagramComponent} from './diagram/diagram.component';

@NgModule({
    declarations: [CanvasDiagramComponent, DiagramComponent],
    imports: [CommonModule],
    exports: [CanvasDiagramComponent],
})
export class CanvasDiagramModule {}
