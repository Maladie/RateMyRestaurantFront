import { Component, OnInit, Input, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Marker, InfoWindow, MouseEvent, LatLngLiteral, MapTypeStyle } from '@agm/core/services/google-maps-types';
import { MouseEvent as Coords } from '@agm/core/map-types';
import { environment } from '../../environments/environment';
import { PlacePin } from './pin/placePin';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window';
import { PlaceDetailsData } from './place-details/place-details-data';
import { WebApiObservableService } from '../shared/web-api-obserable.service';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
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
  detailsData: PlaceDetailsData = new PlaceDetailsData();
  showDetails = false;
  lastDetailsId;
  serverAvailable;
  subscription;
  mapStyle: MapTypeStyle[];
  constructor(private _webApiObservable: WebApiObservableService) { }

  ngOnInit() {
    // every 30sec. check if server available xD
    const timer = TimerObservable.create(1000, 30000);
    this.subscription = timer.subscribe(t => {
      this._webApiObservable.ping();
    });
    // reads and sets map style from /assets/json/map-style.json
    this._webApiObservable.getMapStyle().subscribe(resp => {
      this.mapStyle = resp as MapTypeStyle[];
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateMapCenter(latLng: Coords) {
    // MouseEvent from @agm/core/map-types
    this.lat = latLng.coords.lat;
    this.lng = latLng.coords.lng;
  }
  findPlaces() {
    const center = { lat: this.lat, lng: this.lng } as LatLngLiteral;
    this._webApiObservable.getPlacesInRadius(center, this.radius).subscribe(response => {
      this.places = response as PlacePin[];
    }, err => {
      console.log(err);
      this.showDetails = false;
    });
  }

  getInfo(i: number) {
    return this.places[i].name;
  }

  getAdditionalInfo(i: number) {
    const placeId = this.places[i].id;
    if (placeId !== this.lastDetailsId) {
      this._webApiObservable.getPlaceWithId(placeId).subscribe(resp => {
        this.detailsData = resp as PlaceDetailsData;
        this.lastDetailsId = this.detailsData.id;
        console.log(resp);
      }, err => {
        console.log(err);
      });
    }
    this.showDetails = true;
  }
  handleShowDetails() {
    this.showDetails = false;
  }
  isAvailable() {
    return this._webApiObservable.serverStatus;
  }
}
