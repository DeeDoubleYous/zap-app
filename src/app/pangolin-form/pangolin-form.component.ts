import { Component, OnInit, Input, Output } from '@angular/core';
import { IPangolinRecord } from '../interfaces/IPangolinRecord';
import { UploadService } from '../handle-upload.service';
import { IDeathtype } from '../interfaces/IDeathType';
import { IPangolinInserterItem } from '../interfaces';

@Component({
  selector: 'app-pangolin-form',
  templateUrl: './pangolin-form.component.html',
  styleUrls: ['./pangolin-form.component.css']
})
export class PangolinFormComponent implements OnInit {

  defaultImage = './assets/images/defaultImage.png';

  image?:File | null;
  imageUrl = this.defaultImage;
  imageList?: File[];

  isDead:boolean = false;
  deathId?: number;
  note?: string;

  constructor(
    private uploadService: UploadService
  ) { }

  deathTypes: IDeathtype[] = [];

  pangolin?:IPangolinRecord;

  ngOnInit(): void {
    this.uploadService.getDeathTypes().subscribe(result => this.deathTypes = result);
  }

  handleSubmit(e: Event): void{
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(position => {
        if(this.image){
          const request = new FormData();

          let pangolin = {
            time: this.generateDateString(),
            pangolinImage: this.image,
            location: JSON.stringify({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            }),
            isDead: this.isDead,
            note: this.note
          } as IPangolinInserterItem;

          if(this.isDead == true){
            pangolin.deathId = this.deathId;
          }

          request.set('pangolinImage', this.image);
          request.set('isDead', `${this.isDead}`);
          request.set('time', `${this.generateDateString()}`);
          request.set('location', JSON.stringify({
            lat: position.coords.latitude, 
            lon: position.coords.longitude
          }));
          if(this.isDead == true) request.set(`deathId`, `${this.deathId}`);
          request.set(`note`, `${this.note}`);

          this.uploadService.upload(pangolin);
          
          this.clearInputs();
        }
      }, error=> {
        let msg = 'Error: Location unavalible.';
        if(error.message.toLowerCase().indexOf('user') >= 0){
          msg += ' Please allow access to location services in your settings.';
        }
        alert(msg);
        console.error(error);
      });
    }else{
      alert(`Error: Browser doesn't support geolocation, please update your browser or try a different browser`);
      console.error('Geolocation unsupported by browser');
    }
  }

  handleImageChange(e: Event): void{
    const input = e.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
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
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }

  clearInputs(): void{
    this.isDead = false;
    this.deathId = undefined;
    this.note = '';
    this.image = null;
    this.imageUrl = this.defaultImage;
    this.imageList = [];
  }
}
