import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {snackbarType} from '../models/snackbar-type.enum';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor(private _snackBar: MatSnackBar) {}

    public show(massage: string, type: snackbarType): void {
        this._snackBar.open(massage, 'x', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 4000,
            panelClass: [type, 'snackbar'],
        });
    }
}
