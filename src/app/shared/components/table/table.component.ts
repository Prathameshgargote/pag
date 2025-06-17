import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from '../../service/table.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  displayedColumns: string[] = [
    'fname',
    'Lname',
    'email',
    'DOB',
    'contact',
    'Education',
    'Experience',
    'company',
    'gender',
    'action',
  ];
  tableArr!: any;
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _tableservie: TableService,
    private _matdailog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchAlldata();
  }

  fetchAlldata() {
    this._tableservie.fetchAlltable().subscribe((res) => {
      console.log(res);
      this.tableArr = res || [];
      this.dataSource = new MatTableDataSource(this.tableArr);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  AddEmpolyee() {
    let matdailogref = this._matdailog.open(FormComponent, {
      width: '50%',
      height: '70%',
    });
    matdailogref.afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        // this.tableArr.push(res);
        this.dataSource.data = [...this.dataSource.data, res];
      }
    });
  }

  OnEdit(row: any) {
    let matdailogref = this._matdailog.open(FormComponent, {
      width: '50%',
      height: '70%',
      data: row,
    });
    matdailogref.afterClosed().subscribe((res) => {
      if (res) {
        const index = this.tableArr.findIndex(
          (item: any) => item.Id === res.Id
        );
        // this.tableArr.push(res);
        this.tableArr[index] = res;
        this.dataSource.data = [...this.tableArr];
      }
    });
  }
  OnRemove(row: any) {
    let matdailogRef = this._matdailog.open(GetconfirmComponent, {
      width: '400px',
      disableClose: true,
    });
    matdailogRef.afterClosed().subscribe((res) => {
      if (res) {
        this._tableservie.removeempy(row).subscribe((rem) => {
          const index = this.tableArr.findIndex(
            (item: any) => item.Id === row.Id
          );
          // this.tableArr.push(res);
          this.tableArr.splice(index, 1);
          this.dataSource.data = [...this.tableArr];
          // this.dataSource.data = [...this.dataSource.data, res];
        });
      }
    });
  }
}
