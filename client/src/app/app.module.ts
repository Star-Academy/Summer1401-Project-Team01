import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {HomeModule} from './pages/home/home.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import 'ag-grid-enterprise';
import {DragNDropModule} from './components/drag-n-drop/drag-n-drop.module';
import {MatDialogContainer, MatDialogContent, MatDialogModule} from '@angular/material/dialog';
import {AddProcessorModalComponent} from './pages/pipeline-designer/components/add-processor-modal/add-processor-modal.component';
import {PipelineDesignerModule} from './pages/pipeline-designer/pipeline-designer.module';
import {ColumnTypesComponent} from './pages/home/components/column-types/column-types.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [AppComponent, AddProcessorModalComponent, ColumnTypesComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HeaderModule,
        HomeModule,
        DragNDropModule,
        BrowserAnimationsModule,
        AgGridModule,
        HttpClientModule,
        MatDialogModule,
        PipelineDesignerModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
