import {Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ColumnTypesComponent} from './components/column-types/column-types.component';
import {UploadService} from '../../services/api/upload.service';
import {ListOfItemsComponent} from "../../components/list-of-items/list-of-items.component";
import {DatasetService} from "../../services/api/dataset.service";
import {SnackbarService} from "../../services/snackbar.service";
import {snackbarType} from "../../models/snackbar-type.enum";

@Component({
    selector: 'app-data-inventory',
    templateUrl: './data-inventory.component.html',
    styleUrls: ['./data-inventory.component.scss'],
})
export class DataInventoryComponent {
    @ViewChild(ListOfItemsComponent, {static : true}) public grid!: ListOfItemsComponent;

    public file?: File = undefined;
    public fileStr: string = '';
    public fileName: string = '';
    public columnTitles: string[] = [];
    public columnTypes: string[] = [];
    public columnInfo: {[key: string]: string} = {};
    public disableContinue: boolean = true;
    public isUnique: boolean = false;

    private dialogRefMouseClose: boolean = false;

    public constructor(public dialog: MatDialog, private uploadService: UploadService, private dataset: DatasetService, private snackbar: SnackbarService) {}

    public openSelectTypeModal(): void {
        const dialogRef = this.dialog.open(ColumnTypesComponent, {
            data: {columnTypes: this.columnTypes, columnTitles: this.columnTitles},
        });

        dialogRef.backdropClick().subscribe((result) => {
            this.dialogRefMouseClose = true;
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (!this.dialogRefMouseClose) {
                await this.fileSubmitHandler();
                await this.grid?.updateGrid(this.fileName);
            }

            this.dialogRefMouseClose = false;
        });
    }

    public fillNameInput($event: File): void {
        this.file = $event;
        this.fileStr = this.parseCsv($event);
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

    public parseCsv($event: File): string {
        const reader = new FileReader();
        let lines = '';
        reader.onload = (): void => {
            lines = reader.result as string;
        };
        reader.readAsText($event);
        return lines;
    }

    public fileSubmitHandler(): void {
        for (let i = 0; i < this.columnTypes.length; i++) {
            this.columnInfo[this.columnTitles[i]] = this.columnTypes[i];
        }

        let fileToUpload = <File>this.file;

        const columnInfoStr: string = JSON.stringify(this.columnInfo).replace(/\\r/g, '');

        const formData = new FormData();
        formData.append('username', 'admin');
        formData.append('datasetName', this.fileName);
        //formData.append('file', this.fileStr);
        formData.append('file', fileToUpload);
        formData.append('columnTypes', columnInfoStr);

        this.uploadService.uploadFile(formData).then();

        // this.file = undefined;
        // this.fileName = '';
        // this.columnInfo = {};
    }

    public async checkUnique(): Promise<void> {
        const fileNames = await this.dataset.getDatasets();
        console.log(fileNames)
        for(let i = 0; i < fileNames.length; i++) {
            if (fileNames[i] === this.fileName) {
                this.isUnique = false;
                this.snackbar.show('Enter a Unique Name', snackbarType.WARNING);
                break;
            } else {
                this.isUnique = true;
            }

        }
    }

    public async validateContinue(): Promise<void> {
        await this.checkUnique();
        if (this.file !== undefined && this.fileName !== '' && this.isUnique) {
            this.disableContinue = false;
        } else {
            this.disableContinue = true;
        }
    }
}
