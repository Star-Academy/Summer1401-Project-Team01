import {Injectable} from '@angular/core';
import {SelectedNodeDataModel, SelectedNodeModel} from '../models/selected-node.model';
import {NodeDataModel} from '../models/node-data.model';
import * as go from 'gojs';
import {MatDialog} from '@angular/material/dialog';
import {SelectDatasetComponent} from '../pages/pipeline-designer/components/select-dataset/select-dataset.component';

@Injectable({
    providedIn: 'root',
})
export class DiagramNodeService {
    public nodeDataArray: NodeDataModel[] = [
        {key: 0, name: 'Start', option: null},
        {key: 1, name: 'Destination', parent: 0, option: null},
    ];

    public constructor(public dialog: MatDialog) {}

    public model: go.TreeModel = new go.TreeModel(this.nodeDataArray);

    public static diagram: go.Diagram | null = null;

    public selectedNode: SelectedNodeModel | null = null;
    public selectedNodeData: SelectedNodeDataModel | null = null;

    public updateSelectedNode(_selectedNodeData: SelectedNodeDataModel): void {
        if (!_selectedNodeData) {
            this.selectedNode = null;
            this.selectedNodeData = null;
            return;
        }
        this.selectedNode = {id: _selectedNodeData.key, type: _selectedNodeData.name};
        this.selectedNodeData = JSON.parse(JSON.stringify(_selectedNodeData));
    }

    public addNode(type: string): void {
        console.log(this.selectedNodeData, this.nodeDataArray);
        if (!this.selectedNodeData) {
            return;
        }

        const newNodeData = {
            key: this.selectedNodeData.key + 1,
            name: type,
            parent: this.selectedNodeData?.key,
            option: null,
        };

        for (let i = this.selectedNodeData.key + 1; i < this.nodeDataArray.length; i++) {
            // @ts-ignore
            this.nodeDataArray[i].key++;
            // @ts-ignore
            this.nodeDataArray[i].parent++;
        }

        this.nodeDataArray.splice(this.selectedNodeData.key + 1, 0, newNodeData);

        this.model = new go.TreeModel(this.nodeDataArray);
        console.log(this.model);

        // @ts-ignore
        DiagramNodeService.diagram?.model = this.model;

        this.selectedNode = null;
        this.selectedNodeData = null;
    }

    public removeNode(): void {
        if (!this.selectedNodeData) return;

        for (let i = this.selectedNodeData.key + 1; i < this.nodeDataArray.length; i++) {
            // @ts-ignore
            this.nodeDataArray[i].parent--;

            this.nodeDataArray[i].key--;
        }

        this.nodeDataArray.splice(this.selectedNodeData.key, 1);

        this.model = new go.TreeModel(this.nodeDataArray);

        // @ts-ignore
        DiagramNodeService.diagram?.model = this.model;

        this.selectedNode = null;
        this.selectedNodeData = null;
    }

    public openSelectDatasetModal() {
        const dialog = this.dialog.open(SelectDatasetComponent);
        dialog.afterClosed().subscribe((result) => console.log(`${result}`));
    }

    public changeNodeOption(option: any): void {
        if (!this.selectedNodeData) return;
        this.nodeDataArray[this.selectedNodeData.key].option = option;
    }

    public async fetchDiagram(): Promise<void> {
        // fetch( URL , {
        //     method: 'post',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(this.nodeDataArray),
        //     ...init,
        // })
    }
}
