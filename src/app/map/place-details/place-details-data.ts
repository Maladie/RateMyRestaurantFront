import { PlacePin } from '../pin/placePin';
import { FoodType } from '../../shared/food-type';

export class PlaceDetailsData extends PlacePin {
    foodTypes: FoodType[];
    newlyCreated: boolean;
    ingredientRatings: object[];
    constructor() {
        super();
    }
}
