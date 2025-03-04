import { Component, ElementRef, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import { MapData } from '../../../../../../shared/models/map/map-data';
import { MapDetails } from '../../../../../../shared/models/map/map-details';
import { imageToUrl } from '../../../../../../shared/image-to-url';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-map-mini',
  templateUrl: './map-mini.component.html',
  styleUrls: ['./map-mini.component.css']
})
export class MapMiniComponent {
  
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  private map!: Map;
  
  mapDetails!: MapDetails

  constructor(private mapMiniService: MapService) {}

  ngOnInit() {
    this.map = this.mapMiniService.getMap();
    this.map.setTarget(this.mapElement.nativeElement);

    this.getRandomLocation();
  }

  getRandomLocation(): void {
    this.mapMiniService.getRandomLocation().subscribe((data) => {
      this.mapDetails = data;
      this.mapDetails.mapData.forEach(async (location) => {
        location.image = await imageToUrl(location.image);
        this.mapMiniService.drawCircleLocation(location.center, location.radius);
      });
    });
    this.map.getView().setZoom(0);
    this.map.getView().setCenter([0,0]);
  }

  focusOnLocation(location: MapData): void {
    this.mapMiniService.focusOnLocation(location.center, location.radius);
  }
}