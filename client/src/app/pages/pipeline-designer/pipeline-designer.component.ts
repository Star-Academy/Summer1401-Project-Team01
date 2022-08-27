import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddProcessorModalComponent} from './components/add-processor-modal/add-processor-modal.component';
import {SelectDatasetComponent} from './components/select-dataset/select-dataset.component';
import {SnackbarService} from '../../services/snackbar.service';
import {snackbarType} from '../../models/snackbar-type.enum';
import {DiagramNodeService} from '../../services/diagram-node.service';

@Component({
    selector: 'app-pipeline-designer',
    templateUrl: './pipeline-designer.component.html',
    styleUrls: ['./pipeline-designer.component.scss'],
})
export class PipelineDesignerComponent {
    @ViewChild('canvas', {static: false}) public canvas!: ElementRef | undefined;
    @ViewChild('sample', {static: false}) public sample!: ElementRef | undefined;
    @ViewChild('side', {static: false}) public side!: ElementRef | undefined;
    @ViewChild('dragV', {static: false}) public dragV!: ElementRef | undefined;
    @ViewChild('dragH', {static: false}) public dragH!: ElementRef | undefined;

    private isVResizing = false;
    private isHResizing = false;
    private lastDownX = 0;
    private lastDownY = 0;

    //there should be a function to change this field whenever the selected processor on canvas changes.
    //the value should be the processor key and type. -> 'Join, 1'
    //when no processor is selected the value should be ''.
    public selectedProcessor: string = 'Join, 1';
    public isNodeSelectedForDeleteBtn: boolean = false;
    public isNodeSelectedForStartBtn: boolean = false;

    public constructor(
        private renderer: Renderer2,
        public dialog: MatDialog,
        private snackbarService: SnackbarService,
        public diagramNodeService: DiagramNodeService
    ) {}

    public dragVHandler(e: MouseEvent): void {
        this.isVResizing = true;
    }

    public dragHHandler(e: MouseEvent): void {
        this.isHResizing = true;
    }

    public dragGeneralHandler(e: MouseEvent): void {
        const canvas = this.canvas!.nativeElement;
        const side = this.side!.nativeElement;
        const sample = this.sample!.nativeElement;
        if (this.isHResizing) {
            const offsetRight = parseInt(getComputedStyle(canvas).width) - (e.clientX - parseInt(canvas.offsetLeft));
            this.renderer.setStyle(side, 'width', offsetRight.toString() + 'px');
        }
        if (this.isVResizing) {
            const offsetBottom = parseInt(getComputedStyle(canvas).height) - (e.clientY - parseInt(canvas.offsetTop));
            this.renderer.setStyle(sample, 'height', offsetBottom.toString() + 'px');
        }
    }

    public freeDragHandler(): void {
        this.isVResizing = false;
        this.isHResizing = false;
    }

    public openAddProcessorModal(): void {
        const dialogRef = this.dialog.open(AddProcessorModalComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    public showSnackbar(): void {
        this.snackbarService.show('salam salam salam salam salam salam salam ', snackbarType.WARNING);
    }

    public openSelectDataset(): void {
        const dialogRef = this.dialog.open(SelectDatasetComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    public checkSelectedNode(): void {
        if (this.diagramNodeService.selectedNode?.type === 'Destination') {
            this.isNodeSelectedForDeleteBtn = false;
            this.isNodeSelectedForStartBtn = false;
            return;
        } else if (this.diagramNodeService.selectedNode?.type === 'Start') {
            this.isNodeSelectedForDeleteBtn = false;
            this.isNodeSelectedForStartBtn = true;
            return;
        }
        this.isNodeSelectedForDeleteBtn = !!this.diagramNodeService.selectedNode;
        this.isNodeSelectedForStartBtn = !!this.diagramNodeService.selectedNode;
    }

    public removeNode() {
        this.diagramNodeService.removeNode();
        this.snackbarService.show('Processor has been removed successfully.', snackbarType.INFO);
    }

    public collapseDownSample() {
        console.log(this.sample!.nativeElement.classList);
        if (this.sample!.nativeElement.classList.contains('closed')) {
            this.sample!.nativeElement.classList.remove('closed');
            this.dragV!.nativeElement.hidden = false;
        } else {
            this.sample!.nativeElement.classList.add('closed');
            this.dragV!.nativeElement.hidden = true;
        }
    }

    public collapseRightSide() {
        console.log(this.side!.nativeElement.classList);
        if (this.side!.nativeElement.classList.contains('closed')) {
            this.side!.nativeElement.classList.remove('closed');
            this.dragH!.nativeElement.hidden = false;
        } else {
            this.side!.nativeElement.classList.add('closed');
            this.dragH!.nativeElement.hidden = true;
        }
    }
}
