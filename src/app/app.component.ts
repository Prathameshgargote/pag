import { Component, inject, OnInit } from '@angular/core';
import { TableService } from './shared/service/table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pagination';
  private _tableservie = inject(TableService);
  ngOnInit(): void {
    this._tableservie.fetchAlltable().subscribe((res) => {
      console.log(res);
    });
  }
}
