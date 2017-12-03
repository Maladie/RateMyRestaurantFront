import { Component, OnInit, Input, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Marker, InfoWindow, MouseEvent, LatLngLiteral, MapTypeStyle } from '@agm/core/services/google-maps-types';
import { MouseEvent as Coords } from '@agm/core/map-types';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window';
import { PlaceDetailsData } from './place-details/place-details-data';
import { WebApiObservableService } from '../shared/web-api-obserable.service';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { PlacePin } from '../shared/placePin';
import { DataService } from '../shared/data.service';

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
  @Input() radius = 120;
  places: PlacePin[];
  placeDetailsData: PlaceDetailsData;
  showDetails = false;
  lastDetailsId;
  serverAvailable;
  subscription;
  mapStyle: MapTypeStyle[];
  loading = false;
  constructor(private _webApiObservable: WebApiObservableService, private dataService: DataService) { }

  ngOnInit() {
    // subscribe and notify about position and search radius
    this.radiusChanged();
    this.dataService.searchRarius.subscribe(radius => this.radius = radius);
    this.dataService.placePins.subscribe(pins => this.places = pins);
    this.userPinPositionChange();
    // reads and sets map style from /assets/json/map-style.json
    this._webApiObservable.getMapStyle().subscribe(resp => {
      this.mapStyle = resp as MapTypeStyle[];
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  radiusChanged() {
    this.dataService.changeSearchRadius(this.radius);
  }

  userPinPositionChange() {
    this.dataService.changeUserPinPosition({ lat: this.lat, lng: this.lng } as LatLngLiteral);
    // resets result list while userPin position changes
    this.dataService.changePlacePinsCollection([]);
  }

  updateMapCenter(latLng: Coords) {
    this.lat = latLng.coords.lat;
    this.lng = latLng.coords.lng;
    this.userPinPositionChange();
  }
  findPlaces() {
    this.loading = true;
    const center = { lat: this.lat, lng: this.lng } as LatLngLiteral;
    this._webApiObservable.getPlacesInRadius(center, this.radius).subscribe(response => {
      this.places = response as PlacePin[];
      this.loading = false;
    }, err => {
      console.log(err);
      this.showDetails = false;
      this.loading = false;
    });
  }

  getInfo(i: number) {
    return this.places[i].name;
  }

  getAdditionalInfo(i: number) {
    const placeId = this.places[i].id;
    if (placeId !== this.lastDetailsId) {
      this._webApiObservable.getPlaceWithId(placeId).subscribe(resp => {
        this.placeDetailsData = resp as PlaceDetailsData;
        this.lastDetailsId = this.placeDetailsData.id;
        console.log(resp);
      }, err => {
        console.log(err);
      });
    }
  }
  handleShowDetails() {
    this.showDetails = false;
  }
  isAvailable() {
    return this._webApiObservable.serverStatus;
  }
  infoEnter($event, window: InfoWindow) {
    window.open();
  }
  infoOut($event, window: InfoWindow) {
    window.close();
  }
  showPlaceDetails(i: number) {
    this.showDetails = true;
    if (this.placeDetailsData && this.placeDetailsData.id !== this.places[i].id) {
      this.placeDetailsData = null;
    }
    this.getAdditionalInfo(i);
  }

  moveLocationMarker($event) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.userPinPositionChange();
  }

}
