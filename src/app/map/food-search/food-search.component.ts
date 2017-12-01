import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { PlacePin } from '../../shared/placePin';
import { DataService } from '../../shared/data.service';
import { WebApiObservableService } from '../../shared/web-api-obserable.service';
import { LatLngLiteral } from '@agm/core/services/google-maps-types';
import { FoodType } from '../../shared/food-type';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.css']
})
export class FoodSearchComponent implements OnInit {
  allFoodTypes: FoodType[] = [];
  searchControl: FormControl = new FormControl();
  filteredOptions: Observable<FoodType[]>;
  private position: LatLngLiteral;
  private radius: number;
  private placePins: PlacePin[] = [];
  showSearchingInfo = false;
  constructor(private dataService: DataService, private webApi: WebApiObservableService) { }

  ngOnInit() {
    this.dataService.searchRarius.subscribe(radius => this.radius = radius);
    this.dataService.userPinPosition.subscribe(position => this.position = position);
    this.dataService.placePins.subscribe(placePins => this.placePins = placePins);
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
      startWith({} as FoodType),
      map(foodType => foodType && typeof foodType === 'object' ? foodType.name : foodType),
      map(name => name ? this.filter(name.toString()) : this.allFoodTypes.slice())
      );
    this.webApi.getFoodTypes().subscribe(resp => {
      this.allFoodTypes = resp as FoodType[];
    }, err => {
      console.log('Error while retreaving food types from DB');
    })
  }

  filter(name: string): FoodType[] {
    return this.allFoodTypes.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  search() {
    // this.searchControl.
    let value = '';
    if(this.searchControl.value !== null) {
        // if search value is FoodType
        if(this.searchControl.value.name !== undefined) {
          value = this.searchControl.value.name;
        } else { 
          // or regular string
          value = this.searchControl.value;
        }
    }
    this.showSearchingInfo = true;
    this.webApi.getPlacesInRadiusWithType(this.position, this.radius, value).subscribe(resp => {
      this.dataService.changePlacePinsCollection(resp as PlacePin[]);
      console.log('Found ' + this.placePins.length + ' places');
      this.showSearchingInfo = false;
    }, err => {
      console.log(err);
      console.log('Search failed');
      this.showSearchingInfo = false;
    });
    console.log(value);
  }
  displayFn(food) {
    return food instanceof String ? food : (food != null ? food.name : '');
  }
}
