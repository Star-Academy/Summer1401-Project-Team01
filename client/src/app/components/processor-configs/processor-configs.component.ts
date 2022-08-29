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

    public allConfigElements!: SafeHtml;

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
            this.insertSelectComponent();
        }
    }

    public insertSelectComponent(): void {
        let componentFactory = this.CFR.resolveComponentFactory(ConfigSelectComponent);

        let childComponentRef = this.VCR!.createComponent(componentFactory);

        let childComponent = childComponentRef.instance;
        childComponent.parentRef = this;

        this.selectComponentsReferences.push(childComponentRef);
    }
}
