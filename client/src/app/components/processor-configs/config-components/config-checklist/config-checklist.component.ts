import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

export interface Task {
    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Task[];
}

@Component({
    selector: 'app-config-checklist',
    templateUrl: './config-checklist.component.html',
    styleUrls: ['./config-checklist.component.scss'],
})
export class ConfigChecklistComponent {
    public task: Task = {
        name: 'Indeterminate',
        completed: false,
        color: 'primary',
        subtasks: [
            {name: 'Primary', completed: false, color: 'primary'},
            {name: 'Accent', completed: false, color: 'accent'},
            {name: 'Warn', completed: false, color: 'warn'},
        ],
    };
    public constructor() {}

    public allComplete: boolean = false;

    public updateAllComplete(): void {
        this.allComplete = this.task.subtasks != null && this.task.subtasks.every((t) => t.completed);
    }

    public someComplete(): boolean {
        if (this.task.subtasks == null) {
            return false;
        }
        return this.task.subtasks.filter((t) => t.completed).length > 0 && !this.allComplete;
    }

    public setAll(completed: boolean): void {
        this.allComplete = completed;
        if (this.task.subtasks == null) {
            return;
        }
        this.task.subtasks.forEach((t) => (t.completed = completed));
    }
}
