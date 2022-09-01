import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';
import {DiagramNodeService} from '../../../../services/diagram-node.service';

@Component({
    selector: 'app-sort-config',
    templateUrl: './sort-config.component.html',
    styleUrls: ['./sort-config.component.scss'],
})
export class SortConfigComponent {
    @Input() processorId: number = 0;
    public sortTypes: string;
    public selectedColumn: string = '';
    public selectedSortType: string = '';

    public columns: string = '';
    constructor(
        private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService,
        private diagramNodeService: DiagramNodeService
    ) {
        this.sortTypes = 'Ascending,Descending';
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

    public sortTypeBoolToVal(sortType: boolean): string {
        return sortType ? 'Ascending' : 'Descending';
    }

    public sortTypeValToBool(sortType: string): boolean {
        return sortType === 'Ascending';
    }

    public initializeConfigurations(configs: string) {
        let configsObject: any = {};
        try {
            configsObject = JSON.parse(configs);
        } catch (e) {
            console.log(e);
        }
        if (configsObject.hasOwnProperty('OperationColumn')) this.selectedColumn = configsObject.OperationColumn;
        if (configsObject.hasOwnProperty('SortAscending'))
            this.selectedSortType = this.sortTypeBoolToVal(configsObject.SortAscending);
    }

    public exportConfigurations(): void {
        const configsObject = {
            OperationColumn: this.selectedColumn,
            SortAscending: this.sortTypeValToBool(this.selectedSortType),
        };

        this.diagramNodeService.changeNodeOption(configsObject);
    }

    public async getColumns(): Promise<string> {
        return await this.configsIfOnlyAndOnlyOptionsService.getDatasetColumns();
    }

    public getSelectedColumn(e: string) {
        this.selectedColumn = e;
        console.log(this.selectedColumn);
    }

    public getSelectedSortType(e: string) {
        this.selectedSortType = e;
        console.log(this.selectedSortType);
    }
}
