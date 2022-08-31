import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';
import {DiagramNodeService} from '../../../../services/diagram-node.service';

@Component({
    selector: 'app-field-remover-config',
    templateUrl: './field-remover-config.component.html',
    styleUrls: ['./field-remover-config.component.scss'],
})
export class FieldRemoverConfigComponent {
    @Input() processorId: number = 0;

    public selectedColumns: string = '';

    public constructor(
        private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService,
        private diagramNodeService: DiagramNodeService
    ) {
        //TODO
        if (!!diagramNodeService.selectedNodeData?.key) {
            const configsFromBack = JSON.stringify(
                diagramNodeService.nodeDataArray[diagramNodeService.selectedNodeData?.key].option
            );

            console.log(diagramNodeService.nodeDataArray[diagramNodeService.selectedNodeData?.key].option);

            this.initializeConfigurations(configsFromBack);
        }
        this.initializeConfigurations('');
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

    public exportConfigurations(): string {
        const configsObject: JSON = <JSON>(<any>{
            columns: this.selectedColumns,
        });
        return JSON.stringify(configsObject);
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
