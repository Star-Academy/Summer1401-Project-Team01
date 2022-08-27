import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as go from 'gojs';
import {DiagramNodeService} from '../../../services/diagram-node.service';
import {NodeDataModel} from '../../../models/node-data.model';
import {Point, Spot} from 'gojs';

const $ = go.GraphObject.make;

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent {
    @Input() public model!: go.TreeModel;
    @Input() public nodeDataArray!: NodeDataModel[];

    @Output() public nodeClicked = new EventEmitter();

    //@Input() public diagram: go.Diagram | null = null;

    public selectedNode!: any;

    constructor(private diagramNodeService: DiagramNodeService) {}

    public ngAfterViewInit(): void {
        DiagramNodeService.diagram = $(go.Diagram, 'diagram-div', {
            layout: $(go.TreeLayout, {
                isOngoing: true,
                treeStyle: go.TreeLayout.StyleLastParents,
                arrangement: go.TreeLayout.ArrangementHorizontal,
                // properties for most of the tree:
                angle: 0,
                layerSpacing: 35,
                // properties for the "last parents":
                // alternateAngle: 90,
                alternateLayerSpacing: 35,
                alternateAlignment: go.TreeLayout.AlignmentBus,
                alternateNodeSpacing: 20,
            }),
            'undoManager.isEnabled': true,
            initialAutoScale: go.Diagram.Uniform,
            isTreePathToChildren: true,
            initialContentAlignment: new Spot(0, 0, -100, -100),
        });

        // define the Node template
        DiagramNodeService.diagram.nodeTemplate = $(
            go.Node,
            'Auto',
            // for sorting, have the Node.text be the data.name
            new go.Binding('text', 'name'),
            // bind the Part.layerName to control the Node's layer depending on whether it isSelected
            new go.Binding('layerName', 'isSelected', function (sel) {
                return sel ? 'Foreground' : '';
            }).ofObject(),
            // define the node's outer shape
            $(
                go.Shape,
                'RoundedRectangle',
                {
                    name: 'SHAPE',
                    fill: 'lightblue',
                    stroke: null,
                },
                new go.Binding('fill', '', function (node) {
                    // modify the fill based on the tree depth level
                    const levelColors = [
                        '#AC193D',
                        '#2672EC',
                        '#8C0095',
                        '#5133AB',
                        '#008299',
                        '#D24726',
                        '#008A00',
                        '#094AB2',
                    ];
                    let color = node.findObject('SHAPE').fill;
                    const dia: go.Diagram = node.diagram;
                    if (dia && dia.layout.network) {
                        // @ts-ignore
                        dia.layout.network.vertexes.each(function (v: go.TreeVertex) {
                            if (v.node && v.node.key === node.data.key) {
                                const level: number = v.level % levelColors.length;
                                color = levelColors[level];
                            }
                        });
                    }
                    return color;
                }).ofObject()
            ),
            $(
                go.Panel,
                'Horizontal',
                // define the panel where the text will appear
                $(
                    go.Panel,
                    'Table',
                    {
                        maxSize: new go.Size(150, 999),
                        margin: new go.Margin(6, 10, 0, 3),
                        defaultAlignment: go.Spot.Left,
                    },
                    $(go.RowColumnDefinition, {column: 2, width: 4}),
                    $(
                        go.TextBlock,
                        {font: '9pt  Segoe UI,sans-serif', stroke: 'white'}, // the name
                        {
                            row: 0,
                            column: 0,
                            columnSpan: 5,
                            font: '12pt Segoe UI,sans-serif',
                            editable: false,
                            isMultiline: false,
                            minSize: new go.Size(10, 16),
                        },
                        new go.Binding('text', 'name').makeTwoWay()
                    ),
                    $(
                        go.TextBlock,
                        {font: '9pt  Segoe UI,sans-serif', stroke: 'white'},
                        {row: 2, column: 0},
                        new go.Binding('text', 'key', function (v) {
                            return 'ID: ' + v;
                        })
                    ),
                    $(
                        go.TextBlock,
                        {font: '9pt  Segoe UI,sans-serif', stroke: 'white'}, // the comments
                        {
                            row: 3,
                            column: 0,
                            columnSpan: 5,
                            font: 'italic 9pt sans-serif',
                            wrap: go.TextBlock.WrapFit,
                            editable: true, // by default newlines are allowed
                            minSize: new go.Size(10, 14),
                        },
                        new go.Binding('text', 'comments').makeTwoWay()
                    )
                ) // end Table Panel
            ) // end Horizontal Panel
        ); // end Node

        DiagramNodeService.diagram.linkTemplate = $(
            go.Link,
            {routing: go.Link.AvoidsNodes, corner: 10},
            $(go.Shape),
            $(go.Shape, {toArrow: 'Standard'})
        );

        DiagramNodeService.diagram.model = this.model;

        // when the selection changes, emit event to app-component updating the selected node
        DiagramNodeService.diagram.addDiagramListener('ChangedSelection', (e) => {
            const node = DiagramNodeService.diagram?.selection.first();

            this.selectedNode = node;
            this.diagramNodeService.updateSelectedNode(node?.data);

            this.nodeClicked.emit(node);
        });
    }
}
