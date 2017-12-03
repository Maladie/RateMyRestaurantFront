import { PlacePin } from '../../shared/placePin';
import { FoodType } from '../../shared/food-type';
import { IngredientRating } from '../../shared/ingredient-rating';

export class PlaceDetailsData extends PlacePin {
    foodTypes: FoodType[];
    newlyCreated: boolean;
    ingredientRatings: IngredientRating[];
    constructor() {
        super();
        this.foodTypes = new Array();
        this.ingredientRatings = new Array();
    }
}
