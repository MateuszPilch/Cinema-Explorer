import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import { Overlay } from 'ol';
import { MapService } from 'src/app/services/map/map.service';
import { ActivatedRoute } from '@angular/router';
import { MapAllLocations } from 'shared/models/map/map-all-locations';
import { Point } from 'ol/geom';
import { MapDetails } from 'shared/models/map/map-details';
import { imageToUrl } from 'shared/image-to-url';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

  private map!: Map;
  private mapAllLocations!: MapAllLocations[];

  mapDetails!: MapDetails | null;

  mediaPath!: string;
  location_id!: string;
  
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

    let container = document.getElementById('popup')!;
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

      this.setMediaPath(properties['media_type'], properties['media_id'], properties['location_id']);
      
      if(feature.getProperties()['location_id'] == null) {
        overlay.setPosition(undefined);
        closer.blur();
        return
      } 

      overlay.setPosition(point.getCoordinates());
      overlay.setOffset([-160, -450]);

      closer.onclick = () => {
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

  setMediaPath(media_type: string, media_id: string, location_id: string): void {
    this.mediaPath = `/${media_type}/${media_id}`;
    this.location_id = location_id;
    this.getLocationDetails();
  }

  getLocationDetails(): void {
    this.mapDetails = null;
    this.mapService.getLocationDetails(this.mediaPath, this.location_id).subscribe(async (location) => {
      this.mapDetails = location;
      this.mapDetails.mapData[0].image = await imageToUrl(location.mapData[0].image);
    });
  }
}