import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';

@Component({
    selector: 'app-field-selector-config',
    templateUrl: './field-selector-config.component.html',
    styleUrls: ['./field-selector-config.component.scss'],
})
export class FieldSelectorConfigComponent {
    @Input() processorId: number = 0;
    public selectedColumns: string = '';

    public constructor(private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService) {}

    public getColumns(): string {
        //TODO
        //get columns of current source from service from api
        //this.configsIfOnlyAndOnlyOptionsService.getDatasetColumns().then();
        return 'name,age,nationality,address,phone';
    }

    public getSelectedColumns(e: string) {
        this.selectedColumns = e;
        console.log(this.selectedColumns);
    }
}
