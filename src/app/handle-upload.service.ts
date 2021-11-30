import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService{
  
  url='https://dw470.brighton.domains/zap_api';

  queuedUploads: FormData[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.init();
  }

  init(): void{
    const queueCache = localStorage.getItem('queuedUploads');

    if(queueCache){
      const queue = JSON.parse(queueCache);
      this.queuedUploads = queue.queue;
    }

    if(navigator.onLine){
      this.performQueueUpload();
    }

    window.addEventListener('online', () => {
      this.performQueueUpload();
    });

    window.addEventListener('pagehide', () => {
      const queue = JSON.stringify({
        queue: this.queuedUploads
      });
      localStorage.setItem('queuedUploads', queue);
    });
  }

  upload(upload: FormData){
    if(navigator.onLine){
      this.http.post(this.url, upload);
    }else{
      this.queuedUploads.push(upload);
    }
  }

  performQueueUpload(): void{
    this.queuedUploads = this.performQueueUploadHelper(this.queuedUploads);
  }

  performQueueUploadHelper([upload, ...tail ]: FormData[]): FormData[]{
    if(upload){
      this.http.post(this.url, upload);
      return this.performQueueUploadHelper(tail);
    }
    return [];
  }

}