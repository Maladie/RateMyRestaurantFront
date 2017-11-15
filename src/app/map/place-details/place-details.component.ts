import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { PlaceDetailsData } from './place-details-data';
import { AuthService } from '../../shared/auth.service';
import { IngredientRating } from '../../shared/ingredient-rating';
import { WebApiObservableService } from '../../shared/web-api-obserable.service';
import { IngredientType } from '../../shared/ingredient-type';
import { FoodType } from '../../shared/food-type';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit, OnChanges {
  @Output() showDetails = new EventEmitter<boolean>();
  @Input() detailsData: PlaceDetailsData;
  show: boolean;
  ratings: IngredientRating[] = new Array<IngredientRating>();
  ingredients: IngredientType[];
  foodTypesLeft: Array<FoodType>;
  ingredientsLeft: Array<IngredientType>;
  selectedValue;
  foodAddedLoading = true;
  addingFoodType = false;
  ingredientAddedLoading = true;
  addingIngredient = false;
  constructor(private auth: AuthService, private webApi: WebApiObservableService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.detailsData.currentValue !== undefined) {
      this.getFoodTypes();
      this.getIngredients();
    }
  }

  closeDetails($event) {
    this.showDetails.emit(this.show);
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }
  getFoodTypes() {
    this.webApi.getFoodTypes().subscribe(resp => {
      this.foodTypesLeft = resp as FoodType[];
      if (this.detailsData.foodTypes !== null) {
        this.foodTypesLeft = this.foodTypesLeft.filter(item => this.detailsData.foodTypes.every(item2 => item2.id !== item.id));
      }
    }, err => {
      console.log('Error while retrieving food types: ' + err);
    });
  }
  getIngredients() {
    this.webApi.getIngredients().subscribe(resp => {
      this.ingredientsLeft = resp as IngredientType[];
      if (this.detailsData.ingredientRatings !== null) {
        this.ingredientsLeft = this.ingredientsLeft.filter(item => this.detailsData.ingredientRatings.every(item2 => item2.ingredient.id !== item.id));
      }
    }, err => {
      console.log('Error while retrieving ingredients: ' + err);
    });
  }
  addFoodType() {
    this.addingFoodType = false; // hide add foodtype form
    this.foodAddedLoading = true; // show animation, begin adding
    // add food type
    const index = this.selectedValue;
    this.selectedValue = undefined; // reset foodtype form dropdown item index
    const foodType = this.foodTypesLeft[index]; // get foodtype using index
    if (this.detailsData.foodTypes === null) {
      this.detailsData.foodTypes = new Array<FoodType>(); // init array if null
    }
    this.detailsData.foodTypes.push(foodType);
    const deailsCopy = this.detailsData;
    this.detailsData = undefined; // show loading animation

    this.webApi.savePlaceDetails(deailsCopy).subscribe(resp => {
      this.detailsData = resp as PlaceDetailsData;
      // remove foodtype from foodtypesLeft if exists in detailsData.foodTypes array
      this.foodTypesLeft = this.foodTypesLeft.filter(item => this.detailsData.foodTypes.every(item2 => item2.id !== item.id));
      console.log('Food type saved successfully');
      this.foodAddedLoading = false; // hide adding animation
    }, err => {
      console.log('Error while trying to save place details in DB ' + JSON.stringify(err));
      this.detailsData = deailsCopy;
      this.foodAddedLoading = false; // hide adding animation
    });
  }

  vote(id: number, upVoted: boolean) {
    this.webApi.voteOnIngredient(id, upVoted).subscribe(resp => {
      const index = this.detailsData.ingredientRatings.findIndex(rating => rating.ingredient.id === id);
      this.detailsData.ingredientRatings[index] = resp as IngredientRating;
      console.log('Vote success!  Rating id: ' + id + ' restaurantId: ' + this.detailsData.id);
    }, err => {
      console.log('Error while voting!  Rating id: ' + id + ' restaurantId: ' + this.detailsData.id);
    });
  }
  trackByFn(index, item) {
    return item.id;
  }

  showFoodTypeAddForm() {
    this.addingFoodType = true;
  }

  newRatingThumbUp() {
    this.ingredientAddedLoading = false; // show loading animation
    // TODO process rating
    this.ingredientAddedLoading = true; // hide after rating add
    this.addingIngredient = false; // hide form
  }
  newRatingThumbDown() {
    this.ingredientAddedLoading = false; // show loading animation
    // TODO process rating
    this.ingredientAddedLoading = true; // hide after rating add
    this.addingIngredient = false; // hide form
  }

  showIngredientAddForm() {
    this.addingIngredient = true; // show form
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
