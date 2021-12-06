import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDeathtype } from './interfaces/IDeathType';
import { IPangolinInserterItem } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class UploadService{
  
  private url='https://dw470.brighton.domains/zap_api';

  private indexDBns = `Error: IndexDB is not supported in this browser please use another`;
  private dbName = `queueCache`;
  private storeName = `queue`;

  private db?: IDBDatabase;

  // private queuedUploads: IPangolinInserterItem[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.init();
  }

  private init(): void{
    this.openDB();

    if(navigator.onLine){
      this.readQueue();
    }

    window.addEventListener('online', () => {
      this.readQueue();
    });
  }

  upload(upload: IPangolinInserterItem){
    const request = this.generateFormData(upload);
    if(navigator.onLine){
      this.http.post(this.url, request).subscribe();
    }else{
      const queue = this.db?.transaction(this.storeName, 'readwrite').objectStore(this.storeName);
      queue?.add(upload);
    }
  }

  private performQueueUpload(queue: IPangolinInserterItem[]): void{
    this.performQueueUploadHelper(queue);
  }

  private performQueueUploadHelper([upload, ...tail ]: IPangolinInserterItem[]): void{
    if(upload){
      this.http.post(this.url, this.generateFormData(upload)).subscribe();
      this.performQueueUploadHelper(tail);
    }
    return;
  }

  private generateFormData(upload: IPangolinInserterItem): FormData{
    const request = new FormData();
    for(let key in upload){
      request.append(key, upload[key]);
    }
    return request;
  }

  private openDB(){
    if(!window.indexedDB){
      alert(this.indexDBns);
    }else{
      const request = window.indexedDB.open(this.dbName, 5);

      request.addEventListener('success', () => {
        this.db = request.result;
        this.readQueue();
      });

      request.addEventListener('upgradeneeded', () => {
        request.result.createObjectStore(
          this.storeName, { keyPath: 'ssn', autoIncrement: true}
        );
      });

      request.addEventListener('error', error => {
        console.error(error);
        alert(`Error: ${error}`);
      });
    }
  }

  private readQueue () {
    if(this.db){
      const objectStore = this.db.transaction(this.storeName, 'readonly').objectStore(this.storeName);
      const getAll = objectStore.getAll();
      getAll.addEventListener('success', () => {
        this.performQueueUpload(getAll.result as IPangolinInserterItem[]);
      });
      this.db?.transaction(this.storeName, 'readwrite').objectStore(this.storeName).clear();
    }
  }

  getDeathTypes(): Observable<IDeathtype[]>{
    if(navigator.onLine){
      const types = this.http.get<IDeathtype[]>(`${this.url}/deathTypes`);

      types.subscribe(resultList => {
        const storeList = JSON.stringify(resultList);
        localStorage.setItem('deathTypes', storeList);
      });

      return types;
    }else{
      const stored = localStorage.getItem('deathTypes');

      if(stored){
        const resultList = JSON.parse(stored) as IDeathtype[];
        return of(resultList);
      }
    }
    return of([]);
  }
}
