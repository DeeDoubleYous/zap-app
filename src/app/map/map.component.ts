import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  map?: L.Map;

  ngOnInit(): void {
    this.initMap();
  }

  initMap():void{
    this.map = L.map('map');
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}'
    +           '?access_token={accessToken}', {
      attribution: 'Map data &copy; OpenstreetMap |'
                  + 'Map tiles &copy; Mapbox',
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiYWxleC13aXNoYXJ0IiwiYSI6ImNrdWNoczhqbTEwZ2EycHF2aTM5OHA4MGcifQ.RVRYKZRa6CRVJ1I6ui1ogg'
    }).addTo(this.map);
  }
}
