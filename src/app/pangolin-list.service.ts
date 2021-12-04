import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPangolinRecord } from './interfaces/IPangolinRecord';

@Injectable({
  providedIn: 'root'
})
export class PangolinListService {

  url = 'https://dw470.brighton.domains/zap_api';

  constructor(
    private http: HttpClient
  ) { 
    
  }

  getPangolinList():Observable<IPangolinRecord[]>{
    return this.http.get<IPangolinRecord[]>(`${this.url}/list`);
  }

  getMapList(limit: number):Observable<IPangolinRecord[]>{
    return this.http.get<IPangolinRecord[]>(`${this.url}/list`, {
      params:{
        limit: limit
      }
    });
  }
}
