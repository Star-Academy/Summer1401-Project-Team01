import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';
import {DiagramNodeService} from '../../../../services/diagram-node.service';

@Component({
    selector: 'app-score-config',
    templateUrl: './score-config.component.html',
    styleUrls: ['./score-config.component.scss'],
})
export class ScoreConfigComponent {
    @Input() processorId: number = 0;
    public selectedPositiveColumns: string = '';
    public selectedNegativeColumns: string = '';
    public selectedNewColumn: string = '';

    public columns: string = '';

    public constructor(
        private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService,
        private diagramNodeService: DiagramNodeService
    ) {
        //TODO
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
        if (configsObject.hasOwnProperty('Goods')) this.selectedPositiveColumns = configsObject.Goods;
        if (configsObject.hasOwnProperty('Bads')) this.selectedNegativeColumns = configsObject.Bads;
        if (configsObject.hasOwnProperty('ColumnName')) this.selectedNewColumn = configsObject.ColumnName;
    }

    public exportConfigurations(): void {
        const configsObject = {
            Goods: this.selectedPositiveColumns,
            Bads: this.selectedNegativeColumns,
            ColumnName: this.selectedNewColumn,
        };

        this.diagramNodeService.changeNodeOption(configsObject);
    }

    public async getColumns(): Promise<string> {
        return await this.configsIfOnlyAndOnlyOptionsService.getDatasetColumns();
    }

    public getSelectedPositiveColumns(e: string) {
        this.selectedPositiveColumns = e;
        console.log(this.selectedPositiveColumns);
    }

    public getSelectedNegativeColumns(e: string) {
        this.selectedNegativeColumns = e;
        console.log(this.selectedNegativeColumns);
    }

    public getSelectedNewColumn(e: string) {
        this.selectedNewColumn = e;
        console.log(this.selectedNewColumn);
    }
}
