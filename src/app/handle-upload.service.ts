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
    const queueCache = localStorage.getItem('queuedUploads');
    
    if(queueCache){
      const queue = JSON.parse(queueCache);
      this.queuedUploads = queue.queue;
      localStorage.clear();
    }

    window.addEventListener('pagehide', e => {
      const queue = JSON.stringify({
        queue: this.queuedUploads
      });
      localStorage.setItem('queuedUploads', queue);
    });

    window.addEventListener('online', () => {
      console.log('online event');
      // this.performUpload();
    });
  }


  addUpload(upload: FormData):void{
    this.queuedUploads.push(upload);
  }

  performUpload(): void{
    this.queuedUploads = this.performUploadHelper(this.queuedUploads);
  }

  performUploadHelper([upload, ...tail ]: FormData[]): FormData[]{
    if(upload){
      this.http.post(this.url, upload);
      return this.performUploadHelper(tail);
    }
    return [];
  }

  run(): void{
    if(navigator.onLine){
      this.performUpload();
    }else{
      self.addEventListener('online', () => {
        this.performUpload();
      });
    }
  }

}
