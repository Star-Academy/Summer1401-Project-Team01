import {Injectable} from '@angular/core';
import {SelectedNodeModel} from '../models/selected-node.model';

@Injectable({
    providedIn: 'root',
})
export class DiagramNodeService {
    public selectedNode: SelectedNodeModel | null = null;

    public updateSelectedNode(_data: any): void {
        this.selectedNode = {id: _data.key, type: _data.name};
    }
}
