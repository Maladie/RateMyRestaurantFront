import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Marker, InfoWindow, MouseEvent } from '@agm/core/services/google-maps-types';
import { MouseEvent as Coords } from '@agm/core/map-types';
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
  @Input() label = '';
  zoom = 17;
  @Input() radius = 150;
  places: PlacePin[];
  lastOpen: InfoWindow;
  constructor(private _router: Router, private _http: HttpClient) { }

  ngOnInit() {
  }

  home() {
    this._router.navigate(['']);
  }
  onDrag(latLng: Coords) {
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
    this._http.get(environment.serverEndpoint + this.placesInRadiusEndpoint, { params: parameters })
      .subscribe(response => {
        this.places = response as PlacePin[];
      }, err => {
        console.log(JSON.stringify(err));
      });
  }
  onMarkerClick($event: MouseEvent, placeIndex: number, window: InfoWindow) {
    if (this.lastOpen !== undefined) {
      this.lastOpen.close();
    }
    console.log('Clicked marker of place No.' + placeIndex + ' w: ' + window);
    this.lastOpen = window;
  }
  getInfo(i: number) {
    return this.places[i].name;
  }
  onMouserOverMarker($event: MouseEvent, window: InfoWindow) {
    if (window !== this.lastOpen) {
      window.open();
      console.log(window);
    }
  }
  onMouseOutMarker($event: MouseEvent, window: InfoWindow) {
    // skip closing if opened using click
    if (window !== this.lastOpen) {
      window.close();
      console.log(window);
    }
  }
}
