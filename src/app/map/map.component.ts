import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Marker } from '@agm/core/services/google-maps-types';
import { MouseEvent } from '@agm/core/map-types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title = 'Angular Google Maps ;)';
  @Input() lat = 50.259995;
  @Input() lng = 19.025488;
  zoom = 15;
  @Input() radius = 40;
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  home() {
    this._router.navigate(['']);
  }
  onDrag( $event: MouseEvent) {
    // import proper mouseEvent
    const latLng =  $event as MouseEvent;
    this.lat = latLng.coords.lat;
    this.lng = latLng.coords.lng;
  }
}
