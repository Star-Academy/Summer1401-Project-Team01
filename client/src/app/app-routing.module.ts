import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {PipelineDesignerComponent} from './pages/pipeline-designer/pipeline-designer.component';
import {DataInventoryComponent} from './pages/data-inventory/data-inventory.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'data-inventory', component: DataInventoryComponent},
    {path: 'pipeline-designer', component: PipelineDesignerComponent},
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: false})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
