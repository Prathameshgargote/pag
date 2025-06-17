import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  BASE_URL: string = environment.baseurl;
  TABLE_URL: string = `${this.BASE_URL}/table.json`;
  constructor(private _http: HttpClient) {}

  fetchAlltable(): Observable<any> {
    return this._http.get<any>(this.TABLE_URL).pipe(
      map((data: any) => {
        let tableArr: any[] = [];
        for (const key in data) {
          tableArr.push({ ...data[key], Id: key });
        }
        return tableArr;
      })
    );
  }

  addEmp(emp: any): Observable<any> {
    return this._http.post<any>(this.TABLE_URL, emp);
  }

  updateEmplyee(empObj: any): Observable<any> {
    let UPDATE_URL = `${this.BASE_URL}/table/${empObj.Id}.json`;
    return this._http.patch<any>(UPDATE_URL, empObj);
  }

  removeempy(emp: any): Observable<any> {
    let REMOVE_URL = `${this.BASE_URL}/table/${emp.Id}.json`;
    return this._http.delete<any>(REMOVE_URL);
  }
}
