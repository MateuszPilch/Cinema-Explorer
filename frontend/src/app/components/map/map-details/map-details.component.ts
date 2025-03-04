import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { imageToUrl } from '../../../../../../shared/image-to-url';
import { MapData } from '../../../../../../shared/models/map/map-data';
import { MapDetails } from '../../../../../../shared/models/map/map-details';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-map-details',
  templateUrl: './map-details.component.html',
  styleUrls: ['./map-details.component.css']
})
export class MapDetailsComponent {

  mediaPath!: string;
  mapDetails!: MapDetails

  isLightboxEnabled: boolean = false;
  lightboxIndex!: number;
  lightboxImage!: string;

  constructor(private route: ActivatedRoute, public authService: AuthService, private mapService: MapService) {}

  ngOnInit() {
    this.route.data.subscribe(({details}) => {
      this.mediaPath = `/${this.route.snapshot.paramMap.get('media_type')}/${this.route.snapshot.paramMap.get('media_id')}`;
      this.mapDetails = details;
      if(this.mapDetails.mapData){
        this.mapDetails.mapData.forEach(async (location) => {
          location.image = await imageToUrl(location.image);
          this.mapService.drawCircleLocation(location.center, location.radius);
        }); 
      }
    });
    setTimeout(() => {
      window.scroll({ 
        top: window.innerHeight/2, 
        left: 0,
      });
    }, 50);
  }

  deleteMapLocation(location_id: string): void {
    this.mapService.deleteMapLocation(this.mediaPath, location_id);
    this.mapDetails.mapData.splice(this.mapDetails.mapData.findIndex((location) => location._id === location_id), 1);
  }

  focusOnLocation(location: MapData): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.mapService.focusOnLocation(location.center, location.radius);
  }

  lightboxControl(status: boolean, index: number): void {
    this.isLightboxEnabled = status;
    this.lightboxIndex = index;
    this.lightboxImage = this.mapDetails.mapData[this.lightboxIndex].image;
  }
}
