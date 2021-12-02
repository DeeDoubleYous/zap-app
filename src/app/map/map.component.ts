import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { IPangolinRecord } from '../interfaces/IPangolinRecord';
import { PangolinItemComponent } from '../pangolin-item/pangolin-item.component';
import { PangolinListService } from '../pangolin-list.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map?: L.Map;

  pinIcon = L.icon({
    iconUrl: './assets/images/PinIcon.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -42]
  });

  constructor(
    private listService: PangolinListService
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap():void{
    this.map = L.map('map');

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}'
    +           '?access_token={accessToken}', {
      attribution: 'Map data &copy; OpenstreetMap | '
                  + 'Map tiles &copy; Mapbox',
      tileSize: 256,
      maxZoom: 22,
      id: 'mapbox/dark-v10',
      accessToken: 'pk.eyJ1IjoiYWxleC13aXNoYXJ0IiwiYSI6ImNrdWNoczhqbTEwZ2EycHF2aTM5OHA4MGcifQ.RVRYKZRa6CRVJ1I6ui1ogg'
    }).addTo(this.map);

    navigator.geolocation.getCurrentPosition(position => {
      this.map?.setView([position.coords.latitude, position.coords.longitude], 15);
    });

    this.addMarkers();
  }

  addMarkers(): void{

    const fetchDateString = (pangolin: IPangolinRecord): string => {
      if(pangolin.time){
        const date = new Date(pangolin.time);
        return date.toLocaleDateString();
      }
      return '';
    };

    const fetchTimeString = (pangolin: IPangolinRecord): string =>{
      if(pangolin.time){
        const date = new Date(pangolin.time);
        return date.toLocaleTimeString();
      }
      return '';
    }

    this.listService.getMapList(50).subscribe(result => {
      if(this.map){
        const markers = L.featureGroup();
        for(let pangolin of result){
          console.log(pangolin.location);
          const marker = L.marker([pangolin.location.lat, pangolin.location.lon], {icon: this.pinIcon}).addTo(this.map);
          marker.bindPopup(`<div class='pangolinInfo'>
                                <p>${pangolin.isDead == true ? 'Found Dead' : 'Found Alive' }</p>
                                <p>Date found: ${fetchDateString(pangolin)} Time found: ${fetchTimeString(pangolin)}</p>
                                ${pangolin.deathType ? `<p>Reported cause of death: ${pangolin.deathType}</p>` : ''}
                                ${(pangolin.note && pangolin.note.length >= 0) ? `<p>Additional notes: ${pangolin.note}` : ''}
                            </div>`);
          markers.addLayer(marker);
        }
      }
    });
  }
}
