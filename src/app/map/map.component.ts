import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { IPangolinRecord } from '../interfaces/IPangolinRecord';
import { PangolinListService } from '../pangolin-list.service';
import { DateHelperModule } from '../date-helper/date-helper.module';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map?: L.Map;

  dateHelper = new DateHelperModule();

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

  /**
   * Initialise the map
   */
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

    this.map?.setView([50.844419, -0.119460], 15);//set the map to around the cockroft building

    this.addMarkers();
  }

  /**
   * Add the markers to the map 
   */
  addMarkers(): void{
    this.listService.getMapList(50).subscribe(result => {
      if(this.map){
        const markers = L.featureGroup();
        for(let pangolin of result){
          const marker = L.marker([pangolin.location.lat, pangolin.location.lon], {icon: this.pinIcon}).addTo(this.map);
          marker.bindPopup(`<div class='pangolinInfo'>
                                <p>${pangolin.isDead == true ? 'Found Dead' : 'Found Alive' }</p>
                                <p>Date found: ${this.dateHelper.fetchDateString(pangolin)} Time found: ${this.dateHelper.fetchTimeString(pangolin)}</p>
                                ${pangolin.deathName ? `<p>Reported cause of death: ${pangolin.deathName}</p>` : ''}
                                ${(pangolin.note && pangolin.note.length >= 0) ? `<p>Additional notes: ${pangolin.note}` : ''}
                            </div>`);
          markers.addLayer(marker);
        }
      }
    });
  }
}
