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

  defaultImage = './assets/images/defaultImage.png';

  image?:File | null;
  imageUrl = this.defaultImage;
  imageList?: File[];

  @Input() isDead:boolean = false;
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

    if(this.image){
      const request = new FormData();
     
      request.set('pangolinImage', this.image);
      request.set('isDead', `${this.isDead}`);
      request.set('time', `${this.generateDateString()}`);
      request.set('location', JSON.stringify({lat: 2, lon: 3}));

      const response = await fetch(this.url, {
        body: request,
        method: 'POST'
      }).catch(console.error);

      this.clearInputs();
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
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }

  clearInputs(): void{
    this.isDead = false;
    this.deathType = '';
    this.note = '';
    this.image = null;
    this.imageUrl = this.defaultImage;
    this.imageList = [];
  }
}
