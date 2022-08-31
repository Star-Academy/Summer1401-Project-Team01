import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BackNameToFrontNameViceVersaService {
    constructor() {}

    public backProcessNameToFrontName(backName: string): string {
        let frontName = 'foo';

        if (backName === 'select') {
            frontName = 'Field selector';
        } else if (backName === 'aggregate') {
            frontName = 'Aggregate';
        } else if (backName === 'join') {
            frontName = 'Join';
        } else if (backName === 'filter') {
            frontName = 'Filter';
        } else if (backName === 'fieldRemover') {
            frontName = 'Field remover';
        }

        return frontName;
    }

    public frontProcessNameToBackName(frontName: string): string {
        let backName = 'foo';

        if (frontName === 'Field selector') {
            backName = 'select';
        } else if (frontName === 'Aggregate') {
            backName = 'aggregate';
        } else if (frontName === 'Join') {
            backName = 'join';
        } else if (frontName === 'Filter') {
            backName = 'filter';
        } else if (frontName === 'Field remover') {
            backName = 'fieldRemover';
        }

        return backName;
    }
}
