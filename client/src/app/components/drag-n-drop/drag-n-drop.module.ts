import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragNDropComponent} from './drag-n-drop.component';
import {DndEventsDirective} from './directive/dnd-events.directive';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [DragNDropComponent, DndEventsDirective],
    imports: [CommonModule, FormsModule],
    exports: [DragNDropComponent],
})
export class DragNDropModule {}
