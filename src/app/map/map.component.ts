import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title = 'Angular Google Maps ;)';
  lat = 50.259995;
  lng = 19.025488;
  zoom = 20;
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  home() {
    this._router.navigate(['']);
  }
}
