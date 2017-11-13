import { LatLngLiteral } from '@agm/core';

export class PlacePin {
    public id: string;
    public name: string;
    public location: LatLngLiteral;
    constructor(){
        this.id = '';
        this.name = '';
        this.location = { lat: 0, lng: 0} as LatLngLiteral;
    }
}
