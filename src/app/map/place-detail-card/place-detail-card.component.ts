import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-place-detail-card',
  templateUrl: './place-detail-card.component.html',
  styleUrls: ['./place-detail-card.component.css']
})
export class PlaceDetailCardComponent implements OnInit {
  @Input() placeIndex: number;
  @Input() placeName: string;
  @Output() showDetails: EventEmitter<boolean>;
  show: boolean;
  constructor() { }

  ngOnInit() {
  }
  closeDetails($event) {
    this.showDetails.emit(this.show);
  }
}
