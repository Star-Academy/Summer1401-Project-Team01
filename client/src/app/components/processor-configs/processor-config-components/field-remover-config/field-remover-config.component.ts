import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-field-remover-config',
    templateUrl: './field-remover-config.component.html',
    styleUrls: ['./field-remover-config.component.scss'],
})
export class FieldRemoverConfigComponent {
    @Input() processorId: number = 0;

    public selectedColumns: string = '';

    public constructor() {}

    public getColumns(): string {
        //TODO
        //get columns of current source from service from api
        return 'name,age,nationality,address,phone';
    }

    public getSelectedColumns(e: string) {
        this.selectedColumns = e;
        console.log(this.selectedColumns);
    }
}
