import { Component, OnInit, Input, Output } from '@angular/core';
import { IPangolinRecord } from '../interfaces/IPangolinRecord';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pangolin-form',
  templateUrl: './pangolin-form.component.html',
  styleUrls: ['./pangolin-form.component.css']
})
export class PangolinFormComponent implements OnInit {
  
  image?:File;

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

  handleSubmit(e: Event): void{
    // e.preventDefault();
    console.log('submit');

    if(this.checkInputs()){
      this.http.post('https://dw470.brighton.domains/zap_api', {
        time: '2021/11/22 12:08', 
        pangolinImage: this.image,
        isDead: this.isDead,
        location:{
          lat: '55',
          lon: '22'
        }
      }).subscribe(res => console.log(res));
      // this.http.get('https://dw470.brighton.domains/zap_api', {responseType: 'text'}).subscribe(res => console.log(res));
    }
  }

  handleImageChange(e: Event): void{
    const input = e.target as HTMLInputElement;
    if(input.files){
      this.image = input.files[0];
    }
  }

  private checkInputs():boolean{
    if(this.image && this.isDead){
      return true;
    }else{
      return false;
    }
  }
}
