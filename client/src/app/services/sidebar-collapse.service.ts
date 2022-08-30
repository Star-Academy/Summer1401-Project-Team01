import {ElementRef, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SidebarCollapseService {
    public sidebar!: ElementRef;
    public leftArrow!: ElementRef;
    public rightArrow!: ElementRef;
    public closed: boolean = false;
    public close(): void {
        this.sidebar.nativeElement.classList.add('closed');
        this.leftArrow.nativeElement.classList.add('show');
        this.leftArrow.nativeElement.classList.remove('hide');
        this.rightArrow.nativeElement.classList.add('hide');
        this.rightArrow.nativeElement.classList.remove('show');
        this.closed = true;
    }
    public open(): void {
        this.sidebar.nativeElement.classList.remove('closed');
        this.rightArrow.nativeElement.classList.add('show');
        this.rightArrow.nativeElement.classList.remove('hide');
        this.leftArrow.nativeElement.classList.add('hide');
        this.leftArrow.nativeElement.classList.remove('show');
        this.closed = false;
    }
    public collapse(): void {
        if (this.closed) this.open();
        else this.close();
    }
    public forceClose(): void {
        if (!this.closed) this.close();
    }
    public forceOpen(): void {
        if (this.closed) this.open();
    }

    constructor() {}

    public setSidebar(sidebarSet: ElementRef, leftArrowSet: ElementRef, rightArrowSet: ElementRef) {
        this.sidebar = sidebarSet;
        this.leftArrow = leftArrowSet;
        this.rightArrow = rightArrowSet;
    }
}
