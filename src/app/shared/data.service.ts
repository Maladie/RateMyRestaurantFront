import { Injectable } from '@angular/core';
import { PlacePin } from './placePin';
import { PlaceDetailsData } from '../map/place-details/place-details-data';
import { LatLngLiteral } from '@agm/core/services/google-maps-types';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
    private placePinsSource = new BehaviorSubject<PlacePin[]>([]);
    placePins = this.placePinsSource.asObservable();
    private userPinPositionSource = new BehaviorSubject<LatLngLiteral>({ lat: 0, lng: 0 } as LatLngLiteral);
    userPinPosition = this.userPinPositionSource.asObservable();
    private searchRadiusSource = new BehaviorSubject<number>(0);
    searchRarius = this.searchRadiusSource.asObservable();

    constructor() { }

    changeSearchRadius(radius: number) {
        this.searchRadiusSource.next(radius);
    }

    changeUserPinPosition(pinPosition: LatLngLiteral) {
        this.userPinPositionSource.next(pinPosition);
    }

    changePlacePinsCollection(placePins: PlacePin[]) {
        this.placePinsSource.next(placePins);
    }
}