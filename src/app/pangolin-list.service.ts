import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPangolinRecord } from './interfaces/IPangolinRecord';

@Injectable({
  providedIn: 'root'
})
export class PangolinListService {

  url = 'https://dw470.brighton.domains/zap_api';

  exmplePangolin: IPangolinRecord[] =[
    {
      id: 23,
      time: new Date(Date.now()),
      imageUrl: './assets/images/defaultImage.png',
      isDead: true,
      deathType: 'car',
      location: {
        lat: '3',
        lon: '3'
      }
    },
    {
      id:1,
      time: new Date('2021/10/2 13:30'),
      imageUrl: './assets/images/examplePangolin.jpg',
      isDead: false,
      location: {
        lat: '2',
        lon: '12'
      }
    },
    {
      id:2,
      time: new Date('2/3/2020'),
      imageUrl: './assets/images/examplePangolin2.jpg',
      isDead: false,
      location: {
        lat: '2',
        lon: '12'
      }
    },
    {
      id:2,
      time: new Date('2/3/2020'),
      imageUrl: './assets/images/examplePangolin2.jpg',
      isDead: false,
      location: {
        lat: '2',
        lon: '12'
      }
    },
    {
      id: 23,
      time: new Date(Date.now()),
      imageUrl: './assets/images/defaultImage.png',
      isDead: true,
      deathType: 'car',
      location: {
        lat: '3',
        lon: '3'
      }
    },
  ] 

  constructor(
    private http: HttpClient
  ) { 
    
  }

  getPangolinList():Observable<IPangolinRecord[]>{
    // return this.http.get<IPangolinRecord[]>(`${this.url}/list`);
    const list = of(this.exmplePangolin);
    return list;
  }
}
