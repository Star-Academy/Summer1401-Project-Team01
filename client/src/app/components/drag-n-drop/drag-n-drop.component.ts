import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {SnackbarService} from '../../services/snackbar.service';
import {snackbarType} from '../../models/snackbar-type.enum';

@Component({
    selector: 'app-drag-n-drop',
    templateUrl: './drag-n-drop.component.html',
    styleUrls: ['./drag-n-drop.component.scss'],
})
export class DragNDropComponent {
    @ViewChild('formRef', {static: false}) public formEl!: ElementRef<HTMLFormElement>;
    @ViewChild('fileDropRef', {static: false}) public fileDropEl!: ElementRef<HTMLInputElement>;

    @Output() public uploadedFile = new EventEmitter<File>();

    public constructor(private snackbar: SnackbarService) {}

    public files: File[] = [];

    public onFileDropped($event: File[]): void {
        this.prepareFilesList($event);
    }

    public fileBrowseHandler(files: any): void {
        this.prepareFilesList(files.files);
    }

    public prepareFilesList(files: File[] | null): void {
        if (files === null) return;

        const formData = new FormData(this.formEl.nativeElement);
        if (!this.fileDropEl.nativeElement.files) return;

        let file = <File>this.fileDropEl.nativeElement.files[0];
        formData.append('file', file);

        this.uploadedFile.emit(file);
        this.snackbar.show('File added, continue to upload', snackbarType.INFO);
        this.fileDropEl.nativeElement.value = '';
    }
}
