import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Marker, InfoWindow, MouseEvent } from '@agm/core/services/google-maps-types';
import { MouseEvent as Coords } from '@agm/core/map-types';
import { environment } from '../../environments/environment';
import { PlacePin } from './placePin';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PlaceDetails } from './placeDetails';
import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window';

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
  placeDetails: PlaceDetails = new PlaceDetails;
  showDetails = false;
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
        this.showDetails = false;
      });
  }

  getInfo(i: number) {
    return this.places[i].name;
  }

  getAdditionalInfo(i: number) {
    const placeId = this.places[i].id;
    this._http.get(environment.serverEndpoint + '/places/' + placeId + '/details').subscribe(
      response => {
        this.placeDetails = response as PlaceDetails;
        this.showDetails = true;
        console.log('Response' + this.placeDetails);
      }, err => {
        console.log('Error: ' + JSON.stringify(err));
        this.showDetails = false;
      });
  }
  closeDetails() {
    this.showDetails = false;
  }
}
