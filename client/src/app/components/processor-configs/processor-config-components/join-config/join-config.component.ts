import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-join-config',
    templateUrl: './join-config.component.html',
    styleUrls: ['./join-config.component.scss'],
})
export class JoinConfigComponent {
    @Input() processorId: number = 0;

    public constructor() {}
}
