import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SelectProcessorService {
    public columns: string[] = [];
    public processorId: number = 0;

    constructor() {}

    public setColumns(columns: string[], processorId: number): void {
        this.columns = columns;
        this.processorId = processorId;
    }

    public getColumns(processorId: number): string[] {
        return [];
    }
}
