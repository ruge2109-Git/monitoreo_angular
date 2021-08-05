import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;

  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  ngOnInit(): void {
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/light-v10`,
      zoom: 10,
      center: [-74.08175, 4.60971]
    });
  }

}
