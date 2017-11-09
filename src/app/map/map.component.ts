import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Marker } from '@agm/core/services/google-maps-types';
import { MouseEvent } from '@agm/core/map-types';
import { environment } from '../../environments/environment';
import { PlacePin } from './placePin';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private placesInRadiusEndpoint = '/places/area';
  title = 'Angular Google Maps ;)';
  @Input() centerMapLat = 50.259995;
  @Input() centerMapLng = 19.025488;
  @Input() lat = 50.259995;
  @Input() lng = 19.025488;
  zoom = 15;
  @Input() radius = 300;
  places: PlacePin[];
  constructor(private _router: Router, private _http: HttpClient) { }

  ngOnInit() {
  }

  home() {
    this._router.navigate(['']);
  }
  onDrag(latLng: MouseEvent) {
    // MouseEvent from @agm/core/map-types
    this.lat = latLng.coords.lat;
    this.lng = latLng.coords.lng;
  }
  findPlaces() {
    const parameters = new HttpParams()
    .append('lat', this.lat.toString())
    .append('lng', this.lng.toString())
    .append('radius', this.radius.toString())
    .append('type', 'test');
    this._http.get(environment.serverEndpoint + this.placesInRadiusEndpoint, {params: parameters})
    .subscribe(response => {
        this.places = response as PlacePin[];
    }, err => {
        console.log(JSON.stringify(err));
    });
  }
}
