import {Component, Input} from '@angular/core';

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

    public constructor() {
        this.joinTypes = 'Inner,Left,Right,Full';
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
