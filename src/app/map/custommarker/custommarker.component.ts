import { Component, OnInit, Input } from '@angular/core';
import { AgmMarker } from '@agm/core/directives/marker';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';

@Component({
  selector: 'app-custommarker',
  templateUrl: './custommarker.component.html',
  styleUrls: ['./custommarker.component.css']
})
export class CustommarkerComponent extends AgmMarker {
  @Input() x= 50.2599;
  @Input() y= 19.0245;
  longitude = this.x;
  latitude = this.y;
  constructor(_markerManager: MarkerManager) {
    super(_markerManager);
   }

}
