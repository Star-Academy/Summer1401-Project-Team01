import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[appDndEvents]',
})
export class DndEventsDirective {
    @HostBinding('class.file-over') public fileOver: boolean = false;
    @Output() public fileDropped = new EventEmitter<any>();

    // Dragover listener
    @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = true;
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
    }

    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt: DragEvent): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
        const files = evt?.dataTransfer?.files;
        if (files && files.length > 0) {
            this.fileDropped.emit(files);
        }
    }
}
