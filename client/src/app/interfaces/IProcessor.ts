import {SafeHtml} from '@angular/platform-browser';

export interface IProcessor {
    name: string;
    description: string;
    icon: SafeHtml;
    inputs: string[];
}
