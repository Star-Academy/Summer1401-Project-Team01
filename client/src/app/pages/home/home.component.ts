import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ColumnTypesComponent} from './components/column-types/column-types.component';
import {UploadService} from "../../services/api/upload.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public file?: File = undefined;
    public fileName: string = '';
    public columnTitles: string[] = [];
    public columnTypes: string[] = [];
    public columnInfo: {[key: string]: string} = {};
    public disableContinue: boolean = true;

    private dialogRefMouseClose: boolean = false;

    public constructor(public dialog: MatDialog,  private uploadService:UploadService) {}

    public openSelectTypeModal(): void {
        const dialogRef = this.dialog.open(ColumnTypesComponent, {
            data: {columnTypes: this.columnTypes, columnTitles: this.columnTitles},
        });

        dialogRef.backdropClick().subscribe((result) => {
            this.dialogRefMouseClose = true;
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (!this.dialogRefMouseClose) this.fileSubmitHandler();

            this.dialogRefMouseClose = false;
        });
    }

    public fillNameInput($event: File): void {
        this.file = $event;
        this.fileName = this.parseName($event.name);
        this.columnTitles = this.parseColumnTitles($event);
        this.columnTypes.fill('String', 0, this.columnTypes.length);

        this.validateContinue();
    }

    public parseName(fullName: string): string {
        fullName = fullName.replace(/ /g, '_');
        let index = fullName.lastIndexOf('.');
        return fullName.substring(0, index);
    }

    public parseColumnTitles($event: File): string[] {
        const titles: string[] = [];
        const reader = new FileReader();
        reader.onload = (): void => {
            const lines = reader.result as string;
            const firstLine = lines.split('\n')[0];
            for (let title of firstLine.split(',')) {
                titles.push(title);
            }
        };
        reader.readAsText($event);
        return titles;
    }

    public fileSubmitHandler(): void {
        for (let i = 0; i < this.columnTypes.length; i++) {
            this.columnInfo[this.columnTitles[i]] = this.columnTypes[i];
        }

        const columnInfoStr: string = JSON.stringify(this.columnInfo);

        // username - datasetName - columnTypes - file
        let formData = new FormData();
        formData.append("userName", 'admin');
        formData.append("name", this.fileName);
        formData.append("file", this.file as Blob);
        formData.append("columnTypes", columnInfoStr);

        console.log(formData)

        this.file = undefined;
        this.fileName = '';
        this.columnInfo = {};
    }

    public validateContinue(): void {
        if (this.file !== undefined && this.fileName !== '') {
            this.disableContinue = false;
        } else {
            this.disableContinue = true;
        }
    }
}
