import { PlaceDetailsData } from '../map/place-details/place-details-data';
import { IngredientType } from './ingredient-type';
import { Thumb } from './thumb';

export class IngredientRating {
    id: number;
    ingredient: IngredientType;
    restaurant: PlaceDetailsData;
    thumb: Thumb;

    constructor() {
        this.id = 0;
        this.ingredient = new IngredientType;
        this.restaurant = new PlaceDetailsData;
        this.thumb = new Thumb();
    }
}
