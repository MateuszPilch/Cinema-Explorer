import { Component, ElementRef, ViewChild } from '@angular/core';
import { Draw, Select } from 'ol/interaction';
import { Type } from 'ol/geom/Geometry';
import Map from 'ol/Map';
import { MapService } from 'src/app/services/map/map.service';
import { click } from 'ol/events/condition';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-map-add',
  templateUrl: './map-add.component.html',
  styleUrls: ['./map-add.component.css']
})
export class MapAddComponent {
  private map!: Map;
  draw!: Draw;
  drawType?: Type = 'Circle';

  name!: string;
  runtime!: number;
  episode!: number;
  description!: string;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.map = this.mapService.getMap();
    const vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    const select = new Select({
      condition: click,
      layers: [vectorLayer]
    });

    this.map.addLayer(vectorLayer);
    this.map.addInteraction(select);

    if(this.drawType) {
      this.draw = new Draw({
        source: vectorSource,
        type: this.drawType
      });
      this.map.addInteraction(this.draw);
    }
  }

  markLocation(): void { 
  }
  
  addMapLocation(): void {

  }
}
