import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import { Feature, View } from 'ol';
import Map from 'ol/Map';
import { Circle, Point } from 'ol/geom';
import { Draw, Select } from 'ol/interaction';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Observable, firstValueFrom } from 'rxjs';
import { MapData } from '../../../shared/models/map/map-data';
import { MapDetails } from '../../../shared/models/map/map-details';
import { ErrorService } from '../error/error.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private map!: Map;
  private vectorSource!: VectorSource;
  private vectorLayer!: VectorLayer<VectorSource>;

  constructor(private http: HttpClient, private router: Router, private errorService: ErrorService) {
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
      source: this.vectorSource,
      style: {
        'circle-radius': 8,
        'circle-fill-color': 'rgb(13 148 136)',
        'fill-color': 'rgba(20, 184, 166, 0.2)',
        'stroke-color':'rgb(13 148 136)',
        'stroke-width': 12,
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

  getVectorSource(): VectorSource {
    return this.vectorSource;
  }

  getVectorLayer(): VectorLayer<VectorSource> {
    return this.vectorLayer;
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

  drawPointLocation(media_type: string, media_id: string, location_id: string, center: number[]): void {
    const pointFeature = new Feature({
      media_type,
      media_id,
      location_id,
      geometry: new Point(center),
    })

    this.vectorSource.addFeature(pointFeature);
  }

  focusOnLocation(center: number[], radius: number): void {
    this.map.getView().fit(new Circle(center, radius), {padding: [200, 100, 200, 100]});
  }

  addMapLocation(mediaPath: string, mapData: MapData): void {
    const formData = new FormData();
    Object.entries(mapData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    firstValueFrom(this.http.post(`${environment.backendUrl}/map${mediaPath}/add`, formData)).then(() => {
      this.router.navigate([`/map${mediaPath}/details`],);
    }).catch((error) => {
      this.errorService.setErrorMessages(error.error.message);
    });
  }

  deleteMapLocation(mediaPath: string, location_id: string): void {
    firstValueFrom(this.http.post<MapDetails>(`${environment.backendUrl}/map${mediaPath}/${location_id}/delete`,{}));
  }

  getMapDetails(mediaPath: string): Observable<MapDetails> {
    return this.http.get<MapDetails>(`${environment.backendUrl}/map${mediaPath}/details`);
  }

  getLocationDetails(mediaPath: string, location_id: string): Observable<MapDetails> {
    return this.http.get<MapDetails>(`${environment.backendUrl}/map${mediaPath}/${location_id}`);
  }

  getRandomLocation(): Observable<MapDetails> {
    this.clearMap();
    return this.http.get<MapDetails>(`${environment.backendUrl}/map/random`);
  }

  getAllLocations(): Observable<MapData[]> {
    return this.http.get<MapData[]>(`${environment.backendUrl}/map/all`);
  }
}

export const mapDetailsResolver: ResolveFn<MapDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(MapService).getMapDetails(`/${route.paramMap.get('media_type')!}/${route.paramMap.get('media_id')!}`);
};

export const mapPageResolver: ResolveFn<MapData[]> = () => {
  return inject(MapService).getAllLocations();
};