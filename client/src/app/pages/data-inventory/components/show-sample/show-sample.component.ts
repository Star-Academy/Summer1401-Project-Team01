import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AgGridAngular} from "ag-grid-angular";
import {ColDef, GridApi} from "ag-grid-community";

@Component({
  selector: 'app-show-sample',
  templateUrl: './show-sample.component.html',
  styleUrls: ['./show-sample.component.scss']
})
export class ShowSampleComponent implements OnInit {
  @ViewChild(AgGridAngular) public agGrid!: AgGridAngular;

  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  public rowData$: any[] = [];

  public constructor(@Inject(MAT_DIALOG_DATA) public data: {sampleData: any[]}) {}

  public ngOnInit():void {
    this.columnDefs = Object.keys(this.data.sampleData[0]).map(x => {
      return {field: x};
    });

    this.rowData$ = this.data.sampleData;
  }
}
