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

@NgModule({
    declarations: [AppComponent, AddProcessorModalComponent],
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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
