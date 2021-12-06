import { Component, OnInit } from '@angular/core';
import { UploadService } from './handle-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'zap-app';

  isOnline: boolean = false;

  constructor(
    private uploadService: UploadService
  ){}

  ngOnInit(){
    self.addEventListener('online', () => {
      this.isOnline = true;
    });

    self.addEventListener('offline', () => {
      this.isOnline = false;
    });

    this.isOnline = navigator.onLine;
  }
}
