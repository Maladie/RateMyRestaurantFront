import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { PlaceDetailsData } from './place-details-data';
import { AuthService } from '../../shared/auth.service';
import { IngredientRating } from '../../shared/ingredient-rating';
import { WebApiObservableService } from '../../shared/web-api-obserable.service';
import { IngredientType } from '../../shared/ingredient-type';
import { FoodType } from '../../shared/food-type';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { VotingLockService } from '../../shared/voting-lock.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit, OnChanges {
  @Output() showDetails = new EventEmitter<boolean>();
  @Input() placeDetailsData: PlaceDetailsData;
  show: boolean;
  ratings: IngredientRating[] = new Array<IngredientRating>();
  ingredients: IngredientType[];
  foodTypesLeft: Array<FoodType> = [];
  ingredientsLeft: Array<IngredientType> = [];
  selectedValue;
  selectedValueNewRating;
  foodAddedLoading = true;
  addingFoodType = false;
  ingredientAddedLoading = true;
  addingIngredient = false;
  votes = Array<number>();

  constructor(private auth: AuthService, private webApi: WebApiObservableService, private ref: ChangeDetectorRef, private voteLock: VotingLockService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.placeDetailsData.currentValue !== undefined && changes.placeDetailsData.currentValue !== null) {
      this.getFoodTypes();
      this.getIngredients();
      this.updateVoted();
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
      if (this.placeDetailsData.foodTypes !== null) {
        // TODO
        this.foodTypesLeft = this.foodTypesLeft.filter(item => this.placeDetailsData.foodTypes.every(item2 => item2.id !== item.id));
      }
    }, err => {
      console.log('Error while retrieving food types: ' + err);
    });
  }
  getIngredients() {
    this.webApi.getIngredients().subscribe(resp => {
      this.ingredientsLeft = resp as IngredientType[];
      if (this.placeDetailsData.ingredientRatings !== null) {
        this.ingredientsLeft = this.ingredientsLeft.filter(item => this.placeDetailsData.ingredientRatings.every(item2 => item2.ingredient.id !== item.id));
      }
    }, err => {
      console.log('Error while retrieving ingredients: ' + err);
    });
  }
  addFoodType() {
    this.addingFoodType = false; // hide add foodtype form
    this.foodAddedLoading = false; // show animation, begin adding
    // add food type
    const index = this.selectedValue;
    this.selectedValue = undefined; // reset foodtype form dropdown item index
    const foodType = this.foodTypesLeft[index]; // get foodtype using index

    this.webApi.addFoodTypeToRestaurant(this.placeDetailsData.id, foodType).subscribe(resp => {
      this.placeDetailsData = resp as PlaceDetailsData;
      // remove foodtype from foodtypesLeft if exists in placeDetailsData.foodTypes array
      this.foodTypesLeft = this.foodTypesLeft.filter(item => this.placeDetailsData.foodTypes.every(item2 => item2.id !== item.id));
      console.log('Food type saved successfully');
      this.getFoodTypes();
      this.foodAddedLoading = true; // hide adding animation
    }, err => {
      console.log('Error while trying to save place details in DB ' + JSON.stringify(err));
      // this.placeDetailsData = deailsCopy;
      this.foodAddedLoading = true; // hide adding animation
    });
  }

  vote(id: number, upVoted: boolean) {
    const restaurantId = this.placeDetailsData.id;
    this.webApi.voteOnIngredient(restaurantId, id, upVoted).subscribe(resp => {
      const index = this.placeDetailsData.ingredientRatings.findIndex(rating => rating.ingredient.id === id);
      this.placeDetailsData.ingredientRatings[index] = resp as IngredientRating;
      this.voteLock.setVoted(restaurantId, id);
      console.log('Vote success!  Rating id: ' + id + ' restaurantId: ' + this.placeDetailsData.id);
      this.updateVoted();
      this.votes.push(id);
    }, err => {
      console.log('Error while voting!  Rating id: ' + id + ' restaurantId: ' + this.placeDetailsData.id);
    });
  }
  trackByFn(index, item) {
    return item.id;
  }

  showFoodTypeAddForm() {
    this.addingFoodType = !this.addingFoodType;
  }

  newRating() {
    this.addingIngredient = false; // hide form
    this.ingredientAddedLoading = false; // show loading animation

    const ingredientId = this.selectedValueNewRating;
    const restaurantId = this.placeDetailsData.id;
    this.webApi.addIngredientRatingToRestaurant(ingredientId, restaurantId).subscribe(resp => {
      if (this.placeDetailsData.ingredientRatings === null) {
        this.placeDetailsData.ingredientRatings = new Array();
      }
      this.placeDetailsData.ingredientRatings.push(resp as IngredientRating);
      console.log('Successfully added new rating to restaurant \n' + resp);
      // array of possible ingredients to rate refresh
      this.ingredientsLeft = this.ingredientsLeft.filter(item => this.placeDetailsData.ingredientRatings.every(item2 => item2.ingredient.id !== item.id));
      this.ingredientAddedLoading = true; // hide animation after rating add
    }, err => {
      console.log('Error occured while adding new rating to restaurant \n' + err);
      this.ingredientAddedLoading = true; // hide animation after rating add
    });
  }
  showIngredientAddForm() {
    this.addingIngredient = !this.addingIngredient; // toggle form
  }
  canVote(id: number): boolean {
    return this.votes.indexOf(id) === -1;
  }

  updateVoted() {
    this.votes = this.voteLock.getVotedByRestaurantId(this.placeDetailsData.id);
  }
}
