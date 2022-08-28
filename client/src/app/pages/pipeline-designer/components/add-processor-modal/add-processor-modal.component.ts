import {Component, Inject} from '@angular/core';
import {IProcessor} from '../../../../interfaces/IProcessor';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {DiagramNodeService} from '../../../../services/diagram-node.service';
import {SnackbarService} from '../../../../services/snackbar.service';
import {snackbarType} from '../../../../models/snackbar-type.enum';

@Component({
    selector: 'app-add-processor-modal',
    templateUrl: './add-processor-modal.component.html',
    styleUrls: ['./add-processor-modal.component.scss'],
})
export class AddProcessorModalComponent {
    public constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private sanitizer: DomSanitizer,
        private diagramNodeService: DiagramNodeService,
        private snackbarService: SnackbarService
    ) {}

    public allProcessors: Array<Partial<IProcessor>> = [
        {
            name: 'Normalize',
            description: 'Converts complex values of a single record into N number of flattened values.',
            icon: this.sanitizer.bypassSecurityTrustHtml(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><g class="ti-normalize-border" fill="#000" fill-rule="nonzero"><path d="M9.92 16h3.33v-3.33H9.92zm0-3.73h3.32V8.94H9.91zm-.01-5.2h3.33V3.76H9.91zm0-3.73h3.33V.01H9.91zM2.56 13H5.9V9.66H2.56z"/><path d="M2.56 10H5.9V6.67H2.56zm0-3.66H5.9V3.01H2.56z"/></g><path d="M10.24 11.94h2.67V9.27h-2.67zm0-8.93h2.67V.34h-2.66zM2.9 6h2.66V3.35H2.9z" class="ti-normalize-blocks-a" fill="#515151" fill-rule="nonzero"/><path d="M10.24 6.75h2.67V4.08h-2.67zM2.9 9.66h2.67V7.01H2.89z" class="ti-normalize-blocks-b" fill="#BCBCBC" fill-rule="nonzero"/><path d="M3.3 10.02h.36v-.36H3.3zm.73 0h.37v-.36h-.37zm.74 0h.37v-.36h-.37zm.75 0h.37v-.36h-.37zm-2.96 0h.37v-.36h-.37z" class="ti-normalize-separator" fill="#FFF" fill-rule="nonzero"/><path d="M10.25 15.66h2.67V13h-2.67zm-7.36-3h2.67V10H2.89z" class="ti-normalize-blocks-c" fill="#8C8C8C" fill-rule="nonzero"/><path d="M7.49 9.63a.4.4 0 0 1-.3-.13.45.45 0 0 1 0-.61l.88-.93-.88-.92a.45.45 0 0 1 0-.61.4.4 0 0 1 .59 0l1.17 1.23a.45.45 0 0 1 0 .61L7.78 9.5a.4.4 0 0 1-.3.13z" class="ti-normalize-arrow" fill="#000" fill-rule="nonzero"/></g></svg>'
            ),
        },
        {
            name: 'Join',
            description: 'Transforms several existing datasets to a new set of combines records.',
            icon: this.sanitizer.bypassSecurityTrustHtml(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M10.5 12.5c-.37 0-.73-.05-1.08-.15a5.49 5.49 0 0 0 0-7.7A4.02 4.02 0 0 1 14.5 8.5a4 4 0 0 1-4 4m-3.92-.15A4.01 4.01 0 0 1 1.5 8.5a4 4 0 0 1 5.08-3.85 5.49 5.49 0 0 0 0 7.7M10.5 3c-.9 0-1.75.22-2.5.6a5.5 5.5 0 1 0 0 9.8 5.48 5.48 0 0 0 8-4.9A5.5 5.5 0 0 0 10.5 3"/></svg>'
            ),
        },
        {
            name: 'Filter',
            description:
                'Filters fields based on one or multiple conditions, ' +
                'splits them and passes the seperated data to the next step in the Pipeline.',
            icon: this.sanitizer.bypassSecurityTrustHtml(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m5.34 1.33-.21-.23V0H2.39c-.76 0-1.38.53-1.38 1.18 0 .65.62 1.17 1.38 1.17H6.3l-.96-1.02zm2.91 4.1L7.23 4.34H2.39c-.76 0-1.38.53-1.38 1.18 0 .65.62 1.17 1.38 1.17h5.86V5.43zM7.07 0v.8l2.39 2.54.73.78v4.12l.37.45 1.49 1.79h.81V4.12L16 .79V0zm3.22 10.97L8.43 8.74 8.4 8.7h-6c-.76 0-1.38.53-1.38 1.18s.62 1.18 1.38 1.18h7.78l.17-.02-.05-.06zm1.87 2.1c.76 0 1.38.52 1.38 1.17 0 .65-.62 1.17-1.38 1.17H2.38c-.76 0-1.38-.52-1.38-1.17 0-.65.62-1.18 1.38-1.18"/></svg>'
            ),
        },
        {
            name: 'Aggregate',
            description: 'Aggregates the incoming schema based on one or more columns, performs sets of operations.',
            icon: this.sanitizer.bypassSecurityTrustHtml(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><path d="M2.2 16h4.78v-4.77H2.2zm8.97-2.83h4.76V8.4h-4.76zM0 10.4h4.77V5.64H0z" class="aggregate-blocks-light-color" fill="#BCBCBC" fill-rule="nonzero"/><path d="M9.98 4.77h4.77V0H9.98zm-8.8 0h4.77V.02H1.2z" class="aggregate-blocks-dark-color" fill="#515151" fill-rule="nonzero"/><g class="aggregate-borders" fill="#000"><path d="M2.2 16h4.78v-4.77H2.2V16zm.49-.48h3.8v-3.81H2.7v3.81zm8.48-2.35h4.76V8.4h-4.76v4.77zm.47-.48h3.82V8.9h-3.82v3.8z"/><path d="M12.2 12.15h2.72V9.42H12.2v2.73zm.5-.5h1.72V9.92H12.7v1.73zM1.02 9.39h2.73V6.66H1.03v2.73zm.5-.5h1.73V7.16H1.53v1.73zm8.45-4.13h4.77V0H9.98v4.77zm.48-.47h3.81V.48h-3.81v3.81zm-9.27.49h4.76V0H1.2v4.77zm.48-.48h3.8V.49h-3.8V4.3z"/></g><path d="M7.36 9.66a.4.4 0 0 1-.3-.13.45.45 0 0 1 0-.62L7.94 8l-.88-.92a.45.45 0 0 1 0-.62.4.4 0 0 1 .6 0l1.16 1.23a.45.45 0 0 1 0 .62L7.65 9.53a.4.4 0 0 1-.3.13" class="aggregate-arrow" fill="#000"/></g></svg>'
            ),
        },
        {
            name: 'Data sampling',
            description:
                'Extracts randomly a subset of your data based on ' +
                'an approximate ratio or a fixed number of records.',
            icon: this.sanitizer.bypassSecurityTrustHtml(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M5.63 8.31 2.7 11.36c-.52.55-1.73 1.7-.67 2.77.95.95 2.12-.24 2.77-.91l4.72-4.9h-3.9Z"/><path d="m5.67 13.36-.17.19c-.67.7-1.59 1.65-2.57 1.65-.46 0-.9-.2-1.38-.61-.46-.41-.7-.84-.72-1.3-.03-.99.94-1.99 1.52-2.58l.14-.15 7.82-8.1 3.17 2.8-7.81 8.1ZM16 5.21 10.09 0 8.9 1.23l.8.7-7.82 8.1-.14.14C1.07 10.85-.06 12 0 13.32c.03.68.36 1.3.99 1.85.62.55 1.27.83 1.94.83 1.35 0 2.4-1.1 3.18-1.92L14.1 5.8l.72.64L16 5.2Z"/></svg>'
            ),
        },
        {
            name: 'Field selector',
            description: 'Selects, edits and recognizes your input fields.',
            icon: this.sanitizer.bypassSecurityTrustHtml(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="20" height="4" rx="1" transform="translate(12 14)"/><rect width="14" height="1" rx=".5" transform="translate(12 6)"/><rect width="17" height="1" rx=".5" transform="translate(12 10)"/><rect width="14" height="1" rx=".5" transform="translate(12 21)"/><rect width="17" height="1" rx=".5" transform="translate(12 25)"/><path d="M4.7 19.54a1 1 0 0 1 0-1.42L5.84 17H1a1 1 0 0 1 0-2h4.83L4.7 13.88a1 1 0 1 1 1.41-1.42l2.83 2.83a1 1 0 0 1 0 1.42l-2.83 2.82a1 1 0 0 1-1.41 0z"/></svg>'
            ),
        },
    ];

    public createProcessor(name: string | undefined): void {
        if (name) {
            this.diagramNodeService.addNode(name);
            this.snackbarService.show('Processor has been added successfully.', snackbarType.INFO);
        }
    }
}
