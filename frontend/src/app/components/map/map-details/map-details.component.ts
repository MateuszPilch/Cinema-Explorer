import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MapDetails } from 'shared/models/map/map-details';

@Component({
  selector: 'app-map-details',
  templateUrl: './map-details.component.html',
  styleUrls: ['./map-details.component.css']
})
export class MapDetailsComponent {

  mediaPath!: string;
  mapDetails!: MapDetails
  items = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({details}) => {
      this.mediaPath = `/${this.route.snapshot.paramMap.get('media_type')}/${this.route.snapshot.paramMap.get('media_id')}`;
      console.log(details);
      this.mapDetails = details;
    });
  }
}
