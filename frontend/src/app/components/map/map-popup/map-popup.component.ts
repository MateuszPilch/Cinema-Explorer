import { Component } from '@angular/core';
import { imageToUrl } from 'shared/image-to-url';
import { MapDetails } from 'shared/models/map/map-details';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css']
})
export class MapPopupComponent {
  
  mapDetails!: MapDetails;

  mediaPath!: string;
  location_id!: string;

  constructor(private mapService: MapService) {}

  setMediaPath(media_type: string, media_id: string, location_id: string): void {
    this.mediaPath = `/${media_type}/${media_id}`;
    this.location_id = location_id;
    this.getLocationDetails();
  }

  getLocationDetails(): void {
    this.mapService.getLocationDetails(this.mediaPath, this.location_id).subscribe((data) => {
      this.mapDetails = data;
      this.mapDetails.mapData[0].image = imageToUrl(data.mapData[0].image);
      console.log(this.mapDetails);
    });
  }
}
