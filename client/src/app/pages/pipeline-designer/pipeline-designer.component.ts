import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddProcessorModalComponent} from './components/add-processor-modal/add-processor-modal.component';
import {SelectDatasetComponent} from './components/select-dataset/select-dataset.component';

@Component({
    selector: 'app-pipeline-designer',
    templateUrl: './pipeline-designer.component.html',
    styleUrls: ['./pipeline-designer.component.scss'],
})
export class PipelineDesignerComponent {
    private isVResizing = false;
    private isHResizing = false;
    private lastDownX = 0;
    private lastDownY = 0;
    private vDragger = document.querySelector('.drag-v');
    private hDragger = document.querySelector('.drag-h');

    @ViewChild('canvas', {static: false}) public canvas!: ElementRef | undefined;
    @ViewChild('sample', {static: false}) public sample!: ElementRef | undefined;
    @ViewChild('side', {static: false}) public side!: ElementRef | undefined;
    @ViewChild('designer', {static: false}) public main!: ElementRef | undefined;

    public constructor(private renderer: Renderer2, public dialog: MatDialog) {}

    public dragVHandler(e: MouseEvent): void {
        this.isVResizing = true;
    }

    public dragHHandler(e: MouseEvent): void {
        this.isHResizing = true;
    }

    public dragGeneralHandler(e: MouseEvent): void {
        const main = this.main!.nativeElement;
        const canvas = this.canvas!.nativeElement;
        const side = this.side!.nativeElement;
        const sample = this.sample!.nativeElement;
        if (this.isHResizing) {
            const offsetRight = parseInt(getComputedStyle(main).width) - (e.clientX - parseInt(main.offsetLeft));
            this.renderer.setStyle(side, 'width', offsetRight.toString() + 'px');
            this.renderer.setStyle(canvas, 'right', offsetRight.toString() + 'px');
        }
        if (this.isVResizing) {
            const offsetBottom = parseInt(getComputedStyle(main).height) - (e.clientY - parseInt(main.offsetTop));

            this.renderer.setStyle(sample, 'height', offsetBottom.toString() + 'px');
            this.renderer.setStyle(canvas, 'bottom', offsetBottom.toString() + 'px');
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

    public openSelectDataset(): void {
        const dialogRef = this.dialog.open(SelectDatasetComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }
}
