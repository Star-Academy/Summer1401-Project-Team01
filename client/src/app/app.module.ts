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

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HeaderModule,
        HomeModule,
        DragNDropModule,
        BrowserAnimationsModule,
        AgGridModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
