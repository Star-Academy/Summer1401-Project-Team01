import {
    AfterContentChecked,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {DiagramNodeService} from '../../services/diagram-node.service';
import {SelectedNodeModel} from '../../models/selected-node.model';
import {Subject} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ConfigSelectComponent} from './config-components/config-select/config-select.component';
import {createLogErrorHandler} from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';

@Component({
    selector: 'app-processor-configs',
    templateUrl: './processor-configs.component.html',
    styleUrls: ['./processor-configs.component.scss'],
})
export class ProcessorConfigsComponent implements OnChanges {
    @ViewChild('viewContainerRef', {read: ViewContainerRef})
    public VCR: ViewContainerRef | null = null;
    public selectComponentsReferences = Array<ComponentRef<ConfigSelectComponent>>();

    @Input() public selectedProcessor: string = '';
    public processorName: string = '';
    public processorType: string = '';
    public hasChanged: boolean = false;

    public selectedNode: SelectedNodeModel | null = null;
    public selectedNodeChange: Subject<SelectedNodeModel> = new Subject<SelectedNodeModel>();

    public isFieldSelector: boolean = false;
    public isAggregation: boolean = false;
    public isJoin: boolean = false;
    public isFilter: boolean = false;
    public isFieldRemover: boolean = false;

    public processorId: number = 0;

    public constructor(
        private diagramNodeService: DiagramNodeService,
        private sanitizer: DomSanitizer,
        private CFR: ComponentFactoryResolver
    ) {
        this.selectedNodeChange.subscribe((value) => {
            this.selectedNode = value;
        });
    }

    public changeSelectedNode() {
        this.selectedNodeChange.next(this.selectedNode!);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.selectedProcessor === '') {
            this.processorName = 'Pipeline Designer';
            this.processorType = '';
        } else {
            this.processorName = this.selectedProcessor.replace(',', ' ');
            this.processorType = this.selectedProcessor.split(',')[0];
        }
        if (this.processorType === 'Field selector') {
            this.isFieldSelector = true;
            this.isAggregation = false;
            this.isJoin = false;
            this.isFilter = false;
            this.isFieldRemover = false;
        } else if (this.processorType === 'Aggregate') {
            this.isFieldSelector = false;
            this.isAggregation = true;
            this.isJoin = false;
            this.isFilter = false;
            this.isFieldRemover = false;
        } else if (this.processorType === 'Join') {
            this.isFieldSelector = false;
            this.isAggregation = false;
            this.isJoin = true;
            this.isFilter = false;
            this.isFieldRemover = false;
        } else if (this.processorType === 'Filter') {
            this.isFieldSelector = false;
            this.isAggregation = false;
            this.isJoin = false;
            this.isFilter = true;
            this.isFieldRemover = false;
        } else if (this.processorType === 'Field remover') {
            this.isFieldSelector = false;
            this.isAggregation = false;
            this.isJoin = false;
            this.isFilter = false;
            this.isFieldRemover = true;
        }
        if (this.diagramNodeService.selectedNode) {
            this.processorId = this.diagramNodeService.selectedNode.id;
        }
    }

    // public insertSelectComponent(): void {
    //     let componentFactory = this.CFR.resolveComponentFactory(ConfigSelectComponent);
    //
    //     let childComponentRef = this.VCR!.createComponent(componentFactory);
    //
    //     let childComponent = childComponentRef.instance;
    //     childComponent.parentRef = this;
    //
    //     this.selectComponentsReferences.push(childComponentRef);
    // }
}
