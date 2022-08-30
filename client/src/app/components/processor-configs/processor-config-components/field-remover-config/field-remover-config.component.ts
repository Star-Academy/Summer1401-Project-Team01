import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';

@Component({
    selector: 'app-field-remover-config',
    templateUrl: './field-remover-config.component.html',
    styleUrls: ['./field-remover-config.component.scss'],
})
export class FieldRemoverConfigComponent {
    @Input() processorId: number = 0;

    public selectedColumns: string = '';

    public constructor(private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService) {
        //TODO
        const configsFromBack = '{"ColumnToBeGroupedBy" : "name", "OperationColumn" : "address","AggregationType" : 1}';
        this.initializeConfigurations(configsFromBack);
    }

    public initializeConfigurations(configs: string) {
        let configsObject: any = {};
        try {
            configsObject = JSON.parse(configs);
        } catch (e) {
            console.log(e);
        }
        if (configsObject.hasOwnProperty('columns')) this.selectedColumns = configsObject.columns;
    }

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
