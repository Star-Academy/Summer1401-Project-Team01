import {Injectable} from '@angular/core';
import {SelectedNodeDataModel, SelectedNodeModel} from '../models/selected-node.model';
import {NodeDataModel} from '../models/node-data.model';
import * as go from 'gojs';

@Injectable({
    providedIn: 'root',
})
export class DiagramNodeService {
    public nodeDataArray: NodeDataModel[] = [
        {key: 0, name: 'Start'},
        {key: 1, name: 'Filter', parent: 0},
    ];

    public model: go.TreeModel = new go.TreeModel(this.nodeDataArray);

    public diagram: go.Diagram | null = null;

    public selectedNode: SelectedNodeModel | null = null;
    public selectedNodeData: SelectedNodeDataModel | null = null;

    public updateSelectedNode(_selectedNodeData: SelectedNodeDataModel): void {
        if (!!_selectedNodeData) this.selectedNode = null;
        this.selectedNode = {id: _selectedNodeData.key, type: _selectedNodeData.name};
        this.selectedNodeData = JSON.parse(JSON.stringify(_selectedNodeData));
    }

    public addNode(type: string): void {
        if (!this.selectedNodeData) {
            return;
        }

        const newNodeData = {
            key: this.selectedNodeData.key + 1,
            name: type,
            parent: this.selectedNodeData?.key,
        };

        for (let i = this.selectedNodeData.key + 1; i < this.nodeDataArray.length; i++) {
            // @ts-ignore
            this.nodeDataArray[i].key++;
            // @ts-ignore
            this.nodeDataArray[i].parent++;
        }

        this.nodeDataArray.splice(this.selectedNodeData.key + 1, 0, newNodeData);

        this.model = new go.TreeModel(this.nodeDataArray);

        // @ts-ignore
        this.diagram?.model = this.model;
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
        this.diagram?.model = this.model;
    }
}
