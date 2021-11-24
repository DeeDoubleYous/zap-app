import { Component, OnInit, Input, Output } from '@angular/core';
import { IPangolinRecord } from '../interfaces/IPangolinRecord';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pangolin-form',
  templateUrl: './pangolin-form.component.html',
  styleUrls: ['./pangolin-form.component.css']
})
export class PangolinFormComponent implements OnInit {
  
  url = 'https://dw470.brighton.domains/zap_api';

  image?:File;
  imageUrl = './assets/images/defaultImage.png';

  @Input() isDead?: boolean;
  @Input() deathType?: string;
  @Input() note?: string;

  constructor(
    private http: HttpClient
  ) { }

  deathTypes: string[] = ['electric fences', 'vehicle', 'I done did it myself', 'natural causes'];

  pangolin?:IPangolinRecord;

  ngOnInit(): void {
  }

  async handleSubmit(e: Event): Promise<void>{
    console.log('submit');

    if(this.image && this.isDead){
      console.log('here');
      const request = new FormData();
     
      request.set('pangolinImage', this.image);
      request.set('isDead', `${this.isDead}`);
      request.set('time', `${this.generateDateString()}`);
      request.set('location', JSON.stringify({lat: 2, lon: 3}));

      const response = await fetch(this.url, {
        body: request,
        method: 'POST'
      }).catch(console.error);
    }
  }

  handleImageChange(e: Event): void{
    const input = e.target as HTMLInputElement;
    if(input.files){
      this.image = input.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = (e) => {
        this.imageUrl = reader.result as string;
      }
    }
  }

  generateDateString(): string {
    const date = new Date(Date.now());
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`
  }
}
