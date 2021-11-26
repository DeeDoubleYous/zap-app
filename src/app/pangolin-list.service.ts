import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPangolinRecord } from './interfaces/IPangolinRecord';
import { exmplePangolin } from './examplePangolinList';

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

  getExampleList():Observable<IPangolinRecord[]>{
    return of(exmplePangolin);
  }
}
