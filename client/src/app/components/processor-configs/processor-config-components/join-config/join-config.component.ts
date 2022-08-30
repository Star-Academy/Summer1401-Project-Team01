import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';

@Component({
    selector: 'app-join-config',
    templateUrl: './join-config.component.html',
    styleUrls: ['./join-config.component.scss'],
})
export class JoinConfigComponent {
    @Input() processorId: number = 0;
    public selectedDataset: string = '';
    public hasSelectedDataset: boolean = false;
    public selectedLeft: string = '';
    public selectedRight: string = '';
    public selectedJoinType: string = '';
    public joinTypes: string;

    public constructor(private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService) {
        this.joinTypes = 'Inner,Left,Right,Full';
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
        if (configsObject.hasOwnProperty('middleDatasetName')) this.selectedDataset = configsObject.middleDatasetName;
        if (configsObject.hasOwnProperty('leftVal')) this.selectedLeft = configsObject.leftVal;
        if (configsObject.hasOwnProperty('rightVal')) this.selectedRight = configsObject.rightVal;
        if (configsObject.hasOwnProperty('type'))
            this.selectedJoinType = this.joinTypeNumberToValue(configsObject.type);
    }

    public joinTypeNumberToValue(number: number): string {
        if (number == 0) return 'Inner';
        else if (number == 1) return 'Left';
        else if (number == 2) return 'Right';
        else if (number == 3) return 'Full';
        return '';
    }

    public joinTypeValueToNumber(value: string): number {
        if (value == 'Inner') return 0;
        else if (value == 'Left') return 1;
        else if (value == 'Right') return 2;
        else if (value == 'Full') return 3;
        return 0;
    }

    public exportConfigurations(): string {
        const configsObject: JSON = <JSON>(<any>{
            middleDatasetName: this.selectedDataset,
            leftVal: this.selectedLeft,
            rightVal: this.selectedRight,
            type: this.joinTypeValueToNumber(this.selectedJoinType),
        });
        return JSON.stringify(configsObject);
    }

    public getDatasets(): string {
        //TODO
        //get all datasets from service from api
        return 'dataset1,test2,my3';
    }

    public getSelectedDataset(e: string) {
        this.selectedDataset = e;
        this.hasSelectedDataset = true;
        console.log(this.selectedDataset);
    }

    public getColumns(): string {
        //TODO
        //get columns of current source from service from api
        return 'name,age,nationality,address,phone';
    }

    public getSelectedLeftVal(e: string) {
        this.selectedLeft = e;
        console.log(this.selectedLeft);
    }

    public getColumnsOfSelectedDataset(): string {
        //TODO
        //get columns of selected dataset from service from api
        return 'color,shape,size';
    }

    public getSelectedRightVal(e: string) {
        this.selectedRight = e;
        console.log(this.selectedRight);
    }

    public getSelectedJoinType(e: string) {
        this.selectedJoinType = e;
        console.log(this.selectedJoinType);
    }
}
