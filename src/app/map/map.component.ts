import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  constructor() { }

  map?: L.Map;

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

    this.map.setView([50.845388, -0.118508], 10);
  }
}
