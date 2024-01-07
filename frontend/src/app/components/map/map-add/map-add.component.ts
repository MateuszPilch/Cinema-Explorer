import { Component } from '@angular/core';
import { Draw, Select } from 'ol/interaction';
import { Type } from 'ol/geom/Geometry';
import Map from 'ol/Map';
import { MapService } from 'src/app/services/map/map.service';
import { click } from 'ol/events/condition';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Circle from 'ol/geom/Circle';
import { DrawEvent } from 'ol/interaction/Draw';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map-add',
  templateUrl: './map-add.component.html',
  styleUrls: ['./map-add.component.css']
})
export class MapAddComponent {

  private map!: Map;
  private vectorSource!: VectorSource;
  private locationImageFile!: File;
  private draw!: Draw;
  private drawType?: Type = 'Circle';

  name!: string;
  runtime!: string;
  episode!: string;
  description!: string;

  mediaPath!: string;
  markLocationEnabled: boolean = true;
  locationImageUrl!: string | ArrayBuffer | null;

  constructor(private route: ActivatedRoute, private mapService: MapService) {}

  ngOnInit() {    
    this.mediaPath = `/${this.route.snapshot.paramMap.get('media_type')}/${this.route.snapshot.paramMap.get('media_id')}`;
    
    this.map = this.mapService.getMap();
    this.vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    const select = new Select({
      condition: click,
      layers: [vectorLayer]
    });

    this.map.addLayer(vectorLayer);
    this.map.addInteraction(select);

    if(this.drawType) {
      this.draw = new Draw({
        source: this.vectorSource,
        type: this.drawType,
        maxPoints: 1
      });

      this.draw.on('drawend', (event: DrawEvent) => {
        this.draw.setActive(false);
        this.markLocationEnabled = !this.markLocationEnabled;
      });
      this.draw.setActive(false);
    }
    this.map.addInteraction(this.draw);
  }

  markLocation(): void {
    this.draw.setActive(true);
  }

  clearLocation(): void {
    this.vectorSource.clear();
    this.markLocationEnabled = !this.markLocationEnabled;
  }

  setLocationImage(event: any): void {
    this.locationImageFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.locationImageFile); 
    reader.onload = (_event) => { 
      this.locationImageUrl = reader.result; 
    }
  }

  addMapLocation(): void {
    const circle = this.vectorSource.getFeatures()[0].getGeometry()! as Circle;
    let radius, center;

    radius = circle.getRadius();
    center = circle.getCenter();

    this.mapService.addMapLocation(this.mediaPath, {
      name: this.name,
      runtime: this.runtime,
      episode: this.episode,
      description: this.description,
      center: center,
      radius: radius,
      image: this.locationImageFile
    });
  }
}