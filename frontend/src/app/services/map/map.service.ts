import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import { Feature, View } from 'ol';
import Map from 'ol/Map';
import { Circle, Geometry } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { Observable, firstValueFrom } from 'rxjs';
import { MapData } from 'shared/models/map/map-data';
import { MapDetails } from 'shared/models/map/map-details';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private map!: Map;
  private vectorSource!: VectorSource;

  constructor(private http: HttpClient, private router: Router) {
    this.initializeMap();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.router.url.startsWith('/map')) {
        this.clearMap();
      }
    });
  }
  
  private initializeMap() {

    this.vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    const rasterLayer = new TileLayer({
      source: new OSM()
    });

    this.map = new Map({
      layers: [rasterLayer, vectorLayer],
      view: new View({
        center: [0, 0],
        zoom: 3
      })
    });
    console.log(this.map.getAllLayers());
  }

  getMap(): Map {
    return this.map;
  }

  clearMap(): void {
    this.map.getInteractions().pop();
    // if(this.map.getLayers().getLength() > 1) {
    //   this.map.getLayers().pop();
    // }
    this.vectorSource.getFeatures().pop();
  }

  addMapLocation(mediaPath: string, mapData: MapData) {
    const formData = new FormData();
    Object.entries(mapData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    firstValueFrom(this.http.post(`http://localhost:3000/api/map${mediaPath}/add`, formData));
  }

  drawMapLocation(center: number[], radius: number): void {
    const circleFeature = new Feature({
      geometry: new Circle(center, radius),
    })
    const circleStyle = new Style({
      fill: new Fill({
        color: 'rgba(20, 184, 166, 0.2)',
      }),
      stroke: new Stroke({
        color: 'rgb(20, 184, 166)',
        width: 4,
      }),
    });
    circleFeature.setStyle(circleStyle);
    this.vectorSource.addFeature(circleFeature);
  }

  focusOnLocation(center: number[], radius: number): void {
    this.map.getView().fit(new Circle(center, radius), {padding: [150, 0, 150, 0]});
  }

  getMapDetails(mediaPath: string): Observable<MapDetails> {
    return this.http.get<MapDetails>(`http://localhost:3000/api/map${mediaPath}/details`,{
    });
  }
}

export const mapDetailsResolver: ResolveFn<MapDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(MapService).getMapDetails(`/${route.paramMap.get('media_type')!}/${route.paramMap.get('media_id')!}`);
};
