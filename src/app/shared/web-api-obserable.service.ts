import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LatLngLiteral } from '@agm/core';
import { IngredientType } from './ingredient-type';
import { PlaceDetailsData } from '../map/place-details/place-details-data';
import { RegisterData } from '../register/register-data';
import { LoginData } from '../login/login-data';
import { ResponseInfo } from './response-info';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FoodType } from './food-type';

@Injectable()
export class WebApiObservableService {
    JSONHeader = new HttpHeaders().append('Content-Type', 'application/json');
    serverStatus = false;
    constructor(private _http: HttpClient) { }

    getPlaceWithId(id: string) {
        return this._http.get(environment.serverEndpoint + environment.restaurantsEndpoint + '/' + id);
    }
    ping() {
        this._http.get(environment.serverEndpoint + '/isLoggedIn').subscribe(ok => {
            this.serverStatus = true;
        }, error => {
            this.serverStatus = false;
        });
    }

    getPlacesInRadius(position: LatLngLiteral, radius: number) {
        const parameters = new HttpParams()
            .append('lat', position.lat.toString())
            .append('lng', position.lng.toString())
            .append('radius', radius.toString());
        return this._http.get(environment.serverEndpoint + environment.restaurantsAreaSearchEndpoint, { params: parameters });
    }

    getPlacesInRadiusWithType(position: LatLngLiteral, radius: number, type: string) {
        const parameters = new HttpParams()
            .append('lat', position.lat.toString())
            .append('lng', position.lng.toString())
            .append('radius', radius.toString())
            .append('foodType', type);
        return this._http.get(environment.serverEndpoint + environment.restaurantsAreaSearchEndpoint, { params: parameters });
    }
    /**
     * Returns array of IngredientType on response
     */
    getIngredients() {
        return this._http.get(environment.serverEndpoint + environment.ingredientEndopoint);
    }

    /**
     * Adds ingredient to DB
     * @param ingredient IngredientType to add to DB
     */
    addIngredient(ingredient: IngredientType) {
        return this._http.post(environment.serverEndpoint + environment.ingredientAddEndpoint, ingredient);
    }

    /**
     * Saves place details to DB
     * @param placeDetails Place details to save in DB
     */
    savePlaceDetails(placeDetails: PlaceDetailsData) {
        return this._http.post(environment.serverEndpoint + environment.restaurantSaveEndpoint,
            JSON.stringify(placeDetails),
            { headers: this.JSONHeader }
        );
    }

    addFoodTypeToRestaurant(restaurantID: string, foodTypeName: FoodType) {
        const foodType = foodTypeName;
        return this._http.post(environment.serverEndpoint + environment.restaurantsEndpoint
            + '/' + restaurantID + '/' + environment.restaurantFoodTypesEndpoint, foodType, { headers: this.JSONHeader })
    }

    /**
     * Gets restaurants by ingredient name
     * @param ingredientName Ingredient name
     */
    getRatings(ingredientName: string) {
        return this._http.get(environment.serverEndpoint + environment.ratingEndpoint + ingredientName);
    }

    getRestaurant(id: string) {
        return this._http.get(environment.serverEndpoint + environment.restaurantsEndpoint + id, { headers: this.JSONHeader });
    }

    addNewUserJSON(registerData: RegisterData) {
        return this._http.post(environment.serverEndpoint + environment.registerEndpoint, registerData);
    }

    loginToWebApi(loginData: LoginData) {
        const h = new HttpHeaders().append('Authorization', 'Basic ' + btoa(loginData.username + ':' + loginData.password))
            .append('Content-Type', 'application/json');
        return this._http
            .post<ResponseInfo>(environment.serverEndpoint + '/api/login',
            loginData,
            {
                headers: h,
                observe: 'response',
                withCredentials: true
            });
        // this._http.post(environment.serverEndpoint + environment.loginEndpoint, body, options, header, param)
    }
    /**
     * Retrieves map style from map-style.json file
     */
    getMapStyle() {
        return this._http.get('./assets/json/map-style.json');
    }
    getFoodTypes() {
        return this._http.get(environment.serverEndpoint + environment.restaurantFoodTypesEndpoint);
    }
    voteOnIngredient(restaurantId: string, ingredientId: number, vote: boolean) {
        const path = environment.serverEndpoint + environment.restaurantsEndpoint + '/' + restaurantId + environment.ratingEndpoint + '/' + ingredientId;
        const newVote = vote ? 'true' : 'false';
        return this._http.put(path, newVote, { headers: this.JSONHeader });
    }
    addIngredientRatingToRestaurant(ingredientId: number, restaurantId: string) {
        const path = environment.serverEndpoint + environment.restaurantsEndpoint + '/' + restaurantId + environment.ratingEndpoint;
        return this._http.post(path, ingredientId, { headers: this.JSONHeader });
    }
}


