import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PlaceDetailsData } from './place-details-data';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
@Output() showDetails = new EventEmitter<boolean>();
@Input() detailsData: PlaceDetailsData;
show: boolean;
  // placeDetails: PlaceDetails;
  constructor() {

  }

  ngOnInit() {
  }
  closeDetails($event) {
    this.showDetails.emit(this.show);
  }
}
