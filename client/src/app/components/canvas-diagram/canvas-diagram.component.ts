import {Component} from '@angular/core';
import * as go from 'gojs';

@Component({
    selector: 'app-canvas-diagram',
    templateUrl: './canvas-diagram.component.html',
    styleUrls: ['./canvas-diagram.component.scss'],
})
export class CanvasDiagramComponent {
    public selectedNode!: go.TreeVertex;

    public nodeDataArray: Array<object> = [
        {key: 0, name: 'Start', next: 1},
        {key: 1, name: 'Filter'},
    ];

    public model: go.TreeModel = new go.TreeModel(this.nodeDataArray);

    public setSelectedNodeClicked(node: go.TreeVertex): void {
        this.selectedNode = node;
    }
}
