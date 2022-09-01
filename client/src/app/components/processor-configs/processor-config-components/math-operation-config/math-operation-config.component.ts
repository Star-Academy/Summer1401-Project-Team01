import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';
import {DiagramNodeService} from '../../../../services/diagram-node.service';

@Component({
    selector: 'app-math-operation-config',
    templateUrl: './math-operation-config.component.html',
    styleUrls: ['./math-operation-config.component.scss'],
})
export class MathOperationConfigComponent {
    @Input() processorId: number = 0;
    public mathOperations: string;
    public selectedFirstColumn: string = '';
    public selectedSecondColumn: string = '';
    public selectedOperator: string = '';
    public selectedNewColumn: string = '';

    public columns: string = '';

    public constructor(
        private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService,
        private diagramNodeService: DiagramNodeService
    ) {
        this.mathOperations = '+,-,*,/';
        if (
            !!diagramNodeService.selectedNodeData?.key &&
            !!diagramNodeService.nodeDataArray[diagramNodeService.selectedNodeData.key].option
        ) {
            const configsFromBack = JSON.stringify(
                diagramNodeService.nodeDataArray[diagramNodeService.selectedNodeData?.key].option
            );

            console.log(diagramNodeService.nodeDataArray[diagramNodeService.selectedNodeData?.key].option);

            this.initializeConfigurations(configsFromBack);
        }
        this.initializeConfigurations('');

        this.getColumns().then((res) => (this.columns = res));
    }

    public initializeConfigurations(configs: string) {
        let configsObject: any = {};
        try {
            configsObject = JSON.parse(configs);
        } catch (e) {
            console.log(e);
        }
        if (configsObject.hasOwnProperty('FirstColumn')) this.selectedFirstColumn = configsObject.FirstColumn;
        if (configsObject.hasOwnProperty('SecondColumn')) this.selectedSecondColumn = configsObject.SecondColumn;
        if (configsObject.hasOwnProperty('Operation')) this.selectedOperator = configsObject.Operation;
        if (configsObject.hasOwnProperty('NewColumn')) this.selectedNewColumn = configsObject.NewColumn;
    }

    public exportConfigurations(): void {
        const configsObject = {
            FirstColumn: this.selectedFirstColumn,
            SecondColumn: this.selectedSecondColumn,
            Operation: this.selectedOperator,
            NewColumn: this.selectedNewColumn,
        };

        this.diagramNodeService.changeNodeOption(configsObject);
    }

    public async getColumns(): Promise<string> {
        return await this.configsIfOnlyAndOnlyOptionsService.getDatasetColumns();
    }

    public getSelectedFirstColumn(e: string) {
        this.selectedFirstColumn = e;
        console.log(this.selectedFirstColumn);
    }

    public getSelectedSecondColumn(e: string) {
        this.selectedSecondColumn = e;
        console.log(this.selectedSecondColumn);
    }

    public getSelectedOperator(e: string) {
        this.selectedOperator = e;
        console.log(this.selectedOperator);
    }

    public getSelectedNewColumn(e: string) {
        this.selectedNewColumn = e;
        console.log(this.selectedNewColumn);
    }
}
