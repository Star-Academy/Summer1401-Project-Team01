import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragNDropComponent} from './drag-n-drop.component';
import {DndEventsDirective} from './directive/dnd-events.directive';

@NgModule({
    declarations: [DragNDropComponent, DndEventsDirective],
    imports: [CommonModule],
    exports: [DragNDropComponent],
})
export class DragNDropModule {}
