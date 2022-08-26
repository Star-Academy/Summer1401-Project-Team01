import {Component} from '@angular/core';
import * as go from 'gojs';
import {NodeDataModel} from '../../models/node-data.model';
import {DiagramNodeService} from '../../services/diagram-node.service';

@Component({
    selector: 'app-canvas-diagram',
    templateUrl: './canvas-diagram.component.html',
    styleUrls: ['./canvas-diagram.component.scss'],
})
export class CanvasDiagramComponent {
    public constructor(public diagramNodeService: DiagramNodeService) {}
    public selectedNode!: go.TreeVertex;

    public nodeDataArray: NodeDataModel[] = this.diagramNodeService.nodeDataArray;

    public model: go.TreeModel = this.diagramNodeService.model;

    public setSelectedNodeClicked(node: go.TreeVertex): void {
        this.selectedNode = node;
    }
}
