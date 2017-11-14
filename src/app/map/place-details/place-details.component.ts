import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PlaceDetailsData } from './place-details-data';
import { AuthService } from '../../shared/auth.service';
import { IngredientRating } from '../../shared/ingredient-rating';
import { WebApiObservableService } from '../../shared/web-api-obserable.service';
import { IngredientType } from '../../shared/ingredient-type';

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
  // placeDetails: PlaceDetails;
  constructor(private auth: AuthService, private webApi: WebApiObservableService) {
  }

  ngOnInit() {
  }
  closeDetails($event) {
    this.showDetails.emit(this.show);
  }
  createRating() {
      this.webApi.getIngredients().subscribe(resp => {
          this.ingredients = resp as IngredientType[];
          let rating = new IngredientRating();
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
}
