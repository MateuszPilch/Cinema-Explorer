import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import { Overlay } from 'ol';
import { MapService } from 'src/app/services/map/map.service';
import { ActivatedRoute } from '@angular/router';
import { MapAllLocations } from 'shared/models/map/map-all-locations';
import { Point } from 'ol/geom';
import { MapDetails } from 'shared/models/map/map-details';
import { imageToUrl } from 'shared/image-to-url';
import VectorSource from 'ol/source/Vector';
import { Fill, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

  private map!: Map;
  private mapAllLocations!: MapAllLocations[];

  mapDetails!: MapDetails | null;
  vectorSource!: VectorSource
  overlay!: Overlay;

  mediaPath!: string;
  location_id!: string;

  isLightboxEnabled: boolean = false;
  lightboxIndex!: number;
  lightboxImage!: string;
  
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
    this.vectorSource = this.mapService.getVectorSource();

    let container = document.getElementById('popup')!;
    
    this.overlay = new Overlay({
      element: container,  
    });
    this.map.addOverlay(this.overlay);

    this.map.on('click', (evt) => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        return feature;
      });
      
      if (feature) {
        const point = feature.getGeometry() as Point;
        const properties = feature.getProperties();

        this.mapDetails = null;
        this.closeOverlay();

        this.mediaPath = `/${properties['media_type']}/${properties['media_id']}`;
        this.location_id = properties['location_id'];

        this.mapService.getLocationDetails(this.mediaPath, this.location_id).subscribe(async (location) => {
          this.mapDetails = location;
          this.mapDetails.mapData[0].image = await imageToUrl(location.mapData[0].image);
          
          setTimeout(() => {
            this.overlay.setPosition(point.getCoordinates());
            this.overlay.setOffset([-container.offsetWidth/2, -container.offsetHeight - 10]);
          }, 100);
        });
        
        if(feature.getProperties()['location_id'] == null) {
          this.closeOverlay()
          return
        } 

      } else {
        this.closeOverlay();
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
  }

  filterLocations(media_type: string): void {
    this.closeOverlay();
    this.vectorSource.getFeatures().forEach((feature) => {
      if(media_type == 'multi' || feature.getProperties()['media_type'] == media_type){
        feature.setStyle(new Style({
          image: new CircleStyle({
            fill: new Fill({
              color:'rgb(20, 184, 166)'
            }),
            radius: 8
          })
        }));
      }
      else{
        feature.setStyle(new Style())
      }
    });
  }

  closeOverlay(): void {
    this.overlay.setPosition(undefined);
  }

  lightboxControl(status: boolean): void {
    this.isLightboxEnabled = status;
    this.lightboxImage = this.mapDetails?.mapData[0].image;
  }
}