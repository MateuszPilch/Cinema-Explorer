import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Feature, View } from 'ol';
import { defaults } from 'ol/control';
import Map from 'ol/Map';
import { Circle, Point } from 'ol/geom';
import { Draw, Select } from 'ol/interaction';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Observable, firstValueFrom } from 'rxjs';
import { MapDetails } from 'shared/models/map/map-details';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})

export class MapMiniService {
  private map!: Map;
  private vectorSource!: VectorSource;
  private vectorLayer!: VectorLayer<VectorSource>;

  constructor(private http: HttpClient) {
    this.initializeMap();
  }
  
  private initializeMap() {

    this.vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: {
        'circle-radius': 8,
        'circle-fill-color': 'rgb(20, 184, 166)',
        'fill-color': 'rgba(20, 184, 166, 0.2)',
        'stroke-color':'rgb(20, 184, 166)',
        'stroke-width': 4,
      },
    });

    const rasterLayer = new TileLayer({
      source: new OSM()
    });

    this.map = new Map({
      layers: [rasterLayer, vectorLayer],
      controls: [],
      view: new View({
        center: [0, 0],
        zoom: 3
      }),
    });
  }

  getMap(): Map {
    return this.map;
  }

  clearMap(): void {
    this.map.getInteractions().forEach((interaction) => {
      if (interaction instanceof Select || interaction instanceof Draw) {
        interaction.setActive(false);
      }
    });
    this.map.getOverlays().pop();
    this.vectorSource.clear();
  }

  drawCircleLocation(center: number[], radius: number): void {
    const circleFeature = new Feature({
      geometry: new Circle(center, radius),
    })
    this.vectorSource.addFeature(circleFeature);
  }

  focusOnLocation(center: number[], radius: number): void {
    this.map.getView().fit(new Circle(center, radius), {padding: [150, 0, 150, 0]});
  }

  getRandomLocation(): Observable<MapDetails> {
    this.clearMap();
    return this.http.get<MapDetails>(`http://localhost:3000/api/map/random`);
  }
}