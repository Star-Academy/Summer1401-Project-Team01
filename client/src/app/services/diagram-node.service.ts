import {Injectable} from '@angular/core';
import {SelectedNodeDataModel, SelectedNodeModel} from '../models/selected-node.model';
import {NodeDataModel, NodeModel} from '../models/node-data.model';
import * as go from 'gojs';
import {MatDialog} from '@angular/material/dialog';
import {SelectDatasetComponent} from '../pages/pipeline-designer/components/select-dataset/select-dataset.component';
import {PIPELINE_UPDATE_PROCESSES} from '../utilities/urls';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DiagramNodeService {
    public pipelinePage: string = '';
    public source: string | null = null;

    public nodeDataArray: NodeDataModel[] = [
        {key: 0, name: 'Start', option: null},
        {key: 1, name: 'Destination', parent: 0, option: null},
    ];

    private isSourceSelected: boolean = false;
    private isDestinationSelected: boolean = false;

    public model: go.TreeModel = new go.TreeModel(this.nodeDataArray);

    public static diagram: go.Diagram | null = null;

    public selectedNode: SelectedNodeModel | null = null;
    public selectedNodeChange: Subject<SelectedNodeModel> = new Subject<SelectedNodeModel>();
    public selectedNodeData: SelectedNodeDataModel | null = null;

    public constructor(public dialog: MatDialog) {}

    public updateSelectedNode(_selectedNodeData: SelectedNodeDataModel): void {
        if (!_selectedNodeData) {
            this.selectedNode = null;
            this.selectedNodeData = null;
            return;
        }
        this.selectedNode = {id: _selectedNodeData.key, type: _selectedNodeData.name};
        this.selectedNodeChange.next(this.selectedNode);
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

        // @ts-ignore
        DiagramNodeService.diagram?.model = this.model;

        this.selectedNode = null;
        this.selectedNodeData = null;

        this.fetchDiagram().then();
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

        this.fetchDiagram().then();
    }

    public orderForAddOrRemoveSrcDes: string = '';

    public openSelectDatasetModal(state: string, order: string) {
        if (state === 'start' && !this.isSourceSelected && order === 'add') {
            this.orderForAddOrRemoveSrcDes = 'add';
            const dialog = this.dialog.open(SelectDatasetComponent);
            dialog.afterClosed().subscribe((result) => {
                console.log(`${result}`);
                this.isSourceSelected = true;
            });
        } else if (state === 'destination' && !this.isDestinationSelected && order === 'add') {
            this.orderForAddOrRemoveSrcDes = 'add';
            const dialog = this.dialog.open(SelectDatasetComponent);
            dialog.afterClosed().subscribe((result) => {
                console.log(`${result}`);
                this.isDestinationSelected = true;
            });
        } else if (state === 'start' && !this.isDestinationSelected && order === 'remove') {
            this.orderForAddOrRemoveSrcDes = 'remove';
            const dialog = this.dialog.open(SelectDatasetComponent);
            dialog.afterClosed().subscribe((result) => {
                console.log(`${result}`);
                this.isDestinationSelected = false;
            });
        } else if (state === 'destination' && !this.isDestinationSelected && order === 'remove') {
            this.orderForAddOrRemoveSrcDes = 'remove';
            const dialog = this.dialog.open(SelectDatasetComponent);
            dialog.afterClosed().subscribe((result) => {
                console.log(`${result}`);
                this.isDestinationSelected = false;
            });
        }
    }

    public changeNodeOption(option: any): void {
        if (!this.selectedNodeData) return;
        this.nodeDataArray[this.selectedNodeData.key].option = option;

        this.fetchDiagram().then();
    }

    public async fetchDiagram(): Promise<void> {
        const nodeArray = this.createNodeArray();

        const formDataForDiagram = new FormData();
        const diagramData = nodeArray.slice(1, nodeArray.length - 1);

        console.log(JSON.stringify(diagramData));
        formDataForDiagram.append('processes', JSON.stringify(diagramData));
        formDataForDiagram.append('name', this.pipelinePage);
        formDataForDiagram.append('username', 'admin');

        await fetch(PIPELINE_UPDATE_PROCESSES, {
            method: 'post',
            body: formDataForDiagram,
        });
    }

    public createNodeArray(): NodeModel[] {
        const nodeArray = [];
        for (let i = 0; i < this.nodeDataArray.length; i++) {
            let name = 'foo';
            if (this.nodeDataArray[i].name === 'Field selector') {
                name = 'select';
            }

            const newNode = {
                id: this.nodeDataArray[i].key,
                name: name,
                option: this.nodeDataArray[i].option,
            };

            nodeArray.push(newNode);
        }
        console.log(nodeArray);
        return nodeArray;
    }
}
