import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import { toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import { Overlay } from 'ol';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  private map!: Map;
  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.map = this.mapService.getMap();
    this.map.setTarget(this.mapElement.nativeElement);

    let container = document.getElementById('popup')!;
    let content = document.getElementById('popup-content')!;
    const closer = document.getElementById('popup-closer')!;

    const overlay = new Overlay({
      element: container,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    //this.map.addOverlay(overlay);
    
    this.map.on('singleclick', function (evt) {
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
    
      content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
      overlay.setPosition(coordinate);
      overlay.setOffset([-112, -320])
    });

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }
}