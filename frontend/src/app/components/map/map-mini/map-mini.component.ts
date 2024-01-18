import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapMiniService } from 'src/app/services/map/map-mini.service';
import Map from 'ol/Map';
import { MapData } from 'shared/models/map/map-data';
import { MapDetails } from 'shared/models/map/map-details';
import { imageToUrl } from 'shared/image-to-url';

@Component({
  selector: 'app-map-mini',
  templateUrl: './map-mini.component.html',
  styleUrls: ['./map-mini.component.css']
})
export class MapMiniComponent {
  
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  private map!: Map;
  
  mapDetails!: MapDetails

  constructor(private mapMiniService: MapMiniService) {}

  ngOnInit() {
    this.map = this.mapMiniService.getMap();
    this.map.setTarget(this.mapElement.nativeElement);

    this.getRandomLocation();
  }

  getRandomLocation(): void {
    this.mapMiniService.getRandomLocation().subscribe((data) => {
      this.mapDetails = data;
      console.log(this.mapDetails);
      this.mapDetails.mapData.forEach(async (location) => {
        location.image = await imageToUrl(location.image);
        this.mapMiniService.drawCircleLocation(location.center, location.radius);
      }); 
    });
  }

  focusOnLocation(location: MapData): void {
    this.mapMiniService.focusOnLocation(location.center, location.radius);
  }
}