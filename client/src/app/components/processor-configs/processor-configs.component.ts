import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {DiagramNodeService} from '../../services/diagram-node.service';
import {SelectedNodeModel} from '../../models/selected-node.model';
import {Subject} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {ConfigSelectComponent} from './config-components/config-select/config-select.component';
import {SidebarCollapseService} from '../../services/sidebar-collapse.service';
import {FieldSelectorConfigComponent} from './processor-config-components/field-selector-config/field-selector-config.component';
import {FieldRemoverConfigComponent} from './processor-config-components/field-remover-config/field-remover-config.component';
import {AggregateConfigComponent} from './processor-config-components/aggregate-config/aggregate-config.component';
import {FilterConfigComponent} from './processor-config-components/filter-config/filter-config.component';
import {JoinConfigComponent} from './processor-config-components/join-config/join-config.component';
import {SortConfigComponent} from './processor-config-components/sort-config/sort-config.component';
import {SnackbarService} from '../../services/snackbar.service';
import {snackbarType} from '../../models/snackbar-type.enum';
import {MathOperationConfigComponent} from './processor-config-components/math-operation-config/math-operation-config.component';
import {ScoreConfigComponent} from './processor-config-components/score-config/score-config.component';

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
    public hasChanged: boolean = true;

    public selectedNode: SelectedNodeModel | null = null;
    public selectedNodeChange: Subject<SelectedNodeModel> = new Subject<SelectedNodeModel>();

    public isFieldSelector: boolean = false;
    public isAggregation: boolean = false;
    public isJoin: boolean = false;
    public isFilter: boolean = false;
    public isFieldRemover: boolean = false;
    public isSort: boolean = false;
    public isMathOperation: boolean = false;
    public isScore: boolean = false;

    public processorId: number = 0;

    public constructor(
        private diagramNodeService: DiagramNodeService,
        private sanitizer: DomSanitizer,
        private CFR: ComponentFactoryResolver,
        private sidebarCollapseService: SidebarCollapseService,
        private snackbarService: SnackbarService
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
        if (this.sidebarCollapseService.sidebar) {
            if (
                this.processorType === 'Start' ||
                this.processorType === 'Destination' ||
                this.selectedProcessor === ''
            ) {
                this.sidebarCollapseService.forceClose();
            } else {
                this.sidebarCollapseService.forceOpen();
            }
        }
        if (this.processorType === 'Field selector') {
            this.isFieldSelector = true;
            this.isAggregation = false;
            this.isJoin = false;
            this.isFilter = false;
            this.isFieldRemover = false;
            this.isSort = false;
            this.isMathOperation = false;
            this.isScore = false;
        } else if (this.processorType === 'Aggregate') {
            this.isFieldSelector = false;
            this.isAggregation = true;
            this.isJoin = false;
            this.isFilter = false;
            this.isFieldRemover = false;
            this.isSort = false;
            this.isMathOperation = false;
            this.isScore = false;
        } else if (this.processorType === 'Join') {
            this.isFieldSelector = false;
            this.isAggregation = false;
            this.isJoin = true;
            this.isFilter = false;
            this.isFieldRemover = false;
            this.isSort = false;
            this.isMathOperation = false;
            this.isScore = false;
        } else if (this.processorType === 'Filter') {
            this.isFieldSelector = false;
            this.isAggregation = false;
            this.isJoin = false;
            this.isFilter = true;
            this.isFieldRemover = false;
            this.isSort = false;
            this.isMathOperation = false;
            this.isScore = false;
        } else if (this.processorType === 'Field remover') {
            this.isFieldSelector = false;
            this.isAggregation = false;
            this.isJoin = false;
            this.isFilter = false;
            this.isFieldRemover = true;
            this.isSort = false;
            this.isMathOperation = false;
            this.isScore = false;
        } else if (this.processorType === 'Sort') {
            this.isFieldSelector = false;
            this.isAggregation = false;
            this.isJoin = false;
            this.isFilter = false;
            this.isFieldRemover = false;
            this.isSort = true;
            this.isMathOperation = false;
            this.isScore = false;
        } else if (this.processorType === 'Math operation') {
            this.isFieldSelector = false;
            this.isAggregation = false;
            this.isJoin = false;
            this.isFilter = false;
            this.isFieldRemover = false;
            this.isSort = false;
            this.isMathOperation = true;
            this.isScore = false;
        } else if (this.processorType === 'Score') {
            this.isFieldSelector = false;
            this.isAggregation = false;
            this.isJoin = false;
            this.isFilter = false;
            this.isFieldRemover = false;
            this.isSort = false;
            this.isMathOperation = false;
            this.isScore = true;
        } else {
            this.isFieldSelector = false;
            this.isAggregation = false;
            this.isJoin = false;
            this.isFilter = false;
            this.isFieldRemover = false;
            this.isSort = false;
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

    @ViewChild(FieldSelectorConfigComponent) public fieldSelectorConfigComponent!: FieldSelectorConfigComponent;
    @ViewChild(FieldRemoverConfigComponent) public fieldRemoverConfigComponent!: FieldRemoverConfigComponent;
    @ViewChild(AggregateConfigComponent) public aggregateConfigComponent!: AggregateConfigComponent;
    @ViewChild(FilterConfigComponent) public filterConfigComponent!: FilterConfigComponent;
    @ViewChild(JoinConfigComponent) public joinConfigComponent!: JoinConfigComponent;
    @ViewChild(SortConfigComponent) public sortConfigComponent!: SortConfigComponent;
    @ViewChild(MathOperationConfigComponent) public mathOperationConfigComponent!: MathOperationConfigComponent;
    @ViewChild(ScoreConfigComponent) public scoreConfigComponent!: ScoreConfigComponent;

    public saveConfigs() {
        if (this.processorType === 'Field selector') {
            this.fieldSelectorConfigComponent.exportConfigurations();
        } else if (this.processorType === 'Field remover') {
            this.fieldRemoverConfigComponent.exportConfigurations();
        } else if (this.processorType === 'Aggregate') {
            this.aggregateConfigComponent.exportConfigurations();
        } else if (this.processorType === 'Filter') {
            this.filterConfigComponent.exportConfigurations();
        } else if (this.processorType === 'Join') {
            this.joinConfigComponent.exportConfigurations();
        } else if (this.processorType === 'Sort') {
            this.sortConfigComponent.exportConfigurations();
        } else if (this.processorType === 'Math operation') {
            this.mathOperationConfigComponent.exportConfigurations();
        } else if (this.processorType === 'Score') {
            this.scoreConfigComponent.exportConfigurations();
        }
        this.snackbarService.show('Processor has been edited successfully.', snackbarType.INFO);
    }
}
