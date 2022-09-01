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
        } else if (backName === 'sort') {
            frontName = 'Sort';
        } else if (backName === 'operation') {
            frontName = 'Math operation';
        } else if (backName === 'score') {
            frontName = 'Score';
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
        } else if (frontName === 'Sort') {
            backName = 'sort';
        } else if (frontName === 'Math operation') {
            backName = 'operation';
        } else if (frontName === 'Score') {
            backName = 'score';
        }

        return backName;
    }
}
