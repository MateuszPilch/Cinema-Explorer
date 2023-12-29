import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { View } from 'ol';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Observable, firstValueFrom } from 'rxjs';
import { MapDetails } from 'shared/models/map/map-details';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private map!: Map;

  constructor(private http: HttpClient) { 
    this.initializeMap();
  }
  
  private initializeMap() {

    const rasterLayer = new TileLayer({
      source: new OSM()
    });

    this.map = new Map({
      layers: [rasterLayer],
      view: new View({
        center: [0, 0],
        zoom: 3
      })
    });
  }

  getMap(): Map {
    return this.map;
  }

  getMapDetails(media_type: string, media_id: string): Observable<MapDetails> {
    return this.http.get<MapDetails>(`http://localhost:3000/api/map/${media_type}/${media_id}/details`,{
    });
  }

  addMapLocation(media_type: string, media_id: string, mapData: any) {
    firstValueFrom(this.http.post(`http://localhost:3000/api/user/map/${media_type}/${media_id}/add`,{mapData
    }));
  }
}

export const mapDetailsResolver: ResolveFn<MapDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(MapService).getMapDetails(route.paramMap.get('media_type')!, route.paramMap.get('media_id')!);
};
