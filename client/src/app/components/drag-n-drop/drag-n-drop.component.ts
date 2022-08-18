import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'app-drag-n-drop',
    templateUrl: './drag-n-drop.component.html',
    styleUrls: ['./drag-n-drop.component.scss'],
})
export class DragNDropComponent {
    @ViewChild('fileDropRef', {static: false}) public fileDropEl!: ElementRef<HTMLInputElement>;
    public files: File[] = [];

    public onFileDropped($event: File[]): void {
        this.prepareFilesList($event);
    }

    public fileBrowseHandler(files: any): void {
        this.prepareFilesList(files.files);
    }

    public prepareFilesList(files: File[] | null): void {
        if (files === null) {
            return;
        }
        for (const item of files) {
            this.files.push(item);
        }
        this.fileDropEl.nativeElement.value = '';

        console.log(this.files);
    }
}
