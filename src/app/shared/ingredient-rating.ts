import { PlaceDetailsData } from '../map/place-details/place-details-data';
import { IngredientType } from './ingredient-type';
import { Thumb } from './thumb';

export class IngredientRating {
    ingredient: IngredientType;
    restaurant: PlaceDetailsData;
    thumb: Thumb;

    constructor() {
        this.ingredient = new IngredientType;
        this.restaurant = new PlaceDetailsData;
        this.thumb = new Thumb();
    }
}
