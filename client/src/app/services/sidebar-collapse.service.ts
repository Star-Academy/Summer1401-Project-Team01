import {ElementRef, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SidebarCollapseService {
    public sidebar!: ElementRef;
    public closed: boolean = false;
    public close(): void {
        this.sidebar.nativeElement.classList.add('closed');
        this.closed = true;
    }
    public open(): void {
        this.sidebar.nativeElement.classList.remove('closed');
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

    public setSidebar(sidebarSet: ElementRef) {
        this.sidebar = sidebarSet;
    }
}
