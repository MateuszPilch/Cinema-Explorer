import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import { Overlay } from 'ol';
import { MapService } from 'src/app/services/map/map.service';
import { ActivatedRoute } from '@angular/router';
import { MapAllLocations } from 'shared/models/map/map-all-locations';
import { Point } from 'ol/geom';
import { MapPopupComponent } from '../map-popup/map-popup.component';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  @ViewChild('popup', { static: false }) private mapPopupComponent!: MapPopupComponent;

  private map!: Map;
  private mapAllLocations!: MapAllLocations[];

  constructor(private route: ActivatedRoute, private mapService: MapService) {}

  ngOnInit() {
    this.route.data.subscribe(({data}) => {
      this.mapAllLocations = data;
      this.mapAllLocations.forEach(media => {
        media.map_data.forEach(location => {
          this.mapService.drawPointLocation(media.media_type, media.media_id, location._id, location.center);
        })
      });
    });

    this.map = this.mapService.getMap();
    this.map.setTarget(this.mapElement.nativeElement);

    let container = document.getElementById('popup')!;
    let content = document.getElementById('popup-content')!;
    const closer = document.getElementById('popup-closer')!;

    const overlay = new Overlay({
      element: container,
      
    });

    this.map.on('click', (evt) => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (!feature) {
        overlay.setPosition(undefined);
        closer.blur();
        return;
      }
      const point = feature.getGeometry() as Point;
      const properties = feature.getProperties();

      overlay.setPosition(point.getCoordinates());
      overlay.setOffset([-160, -450]);

      this.mapPopupComponent.setMediaPath(properties['media_type'],properties['media_id'],properties['location_id']);

      closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      }
    });

    this.map.on('pointermove', (e) => {
      const pixel = this.map.getEventPixel(e.originalEvent);
      const hit = this.map.hasFeatureAtPixel(pixel);
      const target = this.map.getTarget();
      if (target instanceof HTMLElement) {
          target.style.cursor = hit ? 'pointer' : '';
      }
    });

    this.map.addOverlay(overlay);
  }
}