import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PlaceDetailsData } from './place-details-data';
import { AuthService } from '../../shared/auth.service';
import { IngredientRating } from '../../shared/ingredient-rating';
import { WebApiObservableService } from '../../shared/web-api-obserable.service';
import { IngredientType } from '../../shared/ingredient-type';
import { FoodType } from '../../shared/food-type';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
  @Output() showDetails = new EventEmitter<boolean>();
  @Input() detailsData: PlaceDetailsData;
  show: boolean;
  ratings: IngredientRating[] = new Array<IngredientRating>();
  ingredients: IngredientType[];
  allFoodTypes: Array<FoodType>;
  selectedValue;
  // placeDetails: PlaceDetails;
  constructor(private auth: AuthService, private webApi: WebApiObservableService) {
  }

  ngOnInit() {
    this.getFoodTypes();
  }
  closeDetails($event) {
    this.showDetails.emit(this.show);
  }
  createRating() {
    this.webApi.getIngredients().subscribe(resp => {
      this.ingredients = resp as IngredientType[];
      const rating = new IngredientRating();
      rating.ingredientName = this.ingredients[0].name;
      rating.thumbDown = 0;
      rating.thumbUp = 1;
      this.ratings.push(rating);
      this.detailsData.newlyCreated = false;
    }, err => {
      console.log(err);
    });
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }
  getFoodTypes() {
    this.webApi.getFoodTypes().subscribe(resp => {
      this.allFoodTypes = resp as FoodType[];
    }, err => {
      console.log('Error while retrieving food types: ' + err);
    });
  }
  addFoodType() {
    const index = this.selectedValue;
    const foodType = this.allFoodTypes[index];
    if (this.detailsData.foodTypes === null) {
      this.detailsData.foodTypes = new Array<FoodType>();
    }
    this.detailsData.foodTypes.push(foodType);
    const deailsCopy = this.detailsData;
    this.detailsData = undefined;
    this.webApi.savePlaceDetails(deailsCopy).subscribe(resp => {
      this.detailsData = resp as PlaceDetailsData;
      // this.allFoodTypes = this.removeDuplicades(this.detailsData.foodTypes);
      // remove duplicates....
      // let foods = this.allFoodTypes.concat(this.detailsData.foodTypes)
      // this.allFoodTypes = Array.of(new Set(foods));
      console.log('Food type saved successfully');
    }, err => {
      console.log('Error while trying to save place details in DB ' + JSON.stringify(err));
      this.detailsData = deailsCopy;
    });
  }
  // TODO
  // removeDuplicades(array: FoodType[]) {
  //   for (let i = array.length - 1; i >= 0; i--) {
  //     for (let j = 0; j < this.allFoodTypes.length; j++) {
  //       if (array[i] === this.allFoodTypes[j]) {
  //         array.splice(i, 1);
  //       }
  //     }
  //   }
  //   return array;
  // }
}
