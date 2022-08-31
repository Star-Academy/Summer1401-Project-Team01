import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';

@Component({
    selector: 'app-field-selector-config',
    templateUrl: './field-selector-config.component.html',
    styleUrls: ['./field-selector-config.component.scss'],
})
export class FieldSelectorConfigComponent {
    @Input() processorId: number = 0;
    public selectedColumns: string = '';

    public columns: string = '';

    public constructor(public configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService) {
        //TODO
        const configsFromBack = '{"ColumnToBeGroupedBy" : "name", "OperationColumn" : "address","AggregationType" : 1}';
        this.initializeConfigurations(configsFromBack);

        this.getColumns().then((res) => (this.columns = res));
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

    public exportConfigurations(): void {
        this.configsIfOnlyAndOnlyOptionsService.selectorToOption([this.selectedColumns]);

        this.configsIfOnlyAndOnlyOptionsService.selectExportConfigurations(this.selectedColumns);
    }

    public async getColumns(): Promise<string> {
        return await this.configsIfOnlyAndOnlyOptionsService.getDatasetColumns();
    }

    public getSelectedColumns(e: string) {
        this.selectedColumns = e;
        console.log(this.selectedColumns);
    }
}
