import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';
import Map from 'ol/Map';

@Component({
  selector: 'app-map-main',
  templateUrl: './map-main.component.html',
  styleUrls: ['./map-main.component.css']
})
export class MapMainComponent {

  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  private map!: Map;

  constructor(private mapService: MapService) {}

  ngOnInit() { 
    this.map = this.mapService.getMap();
    this.map.setTarget(this.mapElement.nativeElement);
  }
}
