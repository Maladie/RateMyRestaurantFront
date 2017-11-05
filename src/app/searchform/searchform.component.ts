import { Component, OnInit } from '@angular/core';
import { SearchInRadius } from '../SearchInRadius';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  model: SearchInRadius;
  submitted;
  results: string[];
  constructor(private http: HttpClient) {
    this.model = new SearchInRadius(0, 0, 0, 'bar');
    this.submitted = false;
  }
  onSubmit(f: NgForm) {
    console.log('in onSubmit');
    console.log('going to -> url: ' + environment.serverEndpoint + '/getPlacesInRadius');
    const parameters = new HttpParams()
      .append('lat', this.model.lat.toString())
      .append('lng', this.model.lng.toString())
      .append('radius', this.model.radius.toString())
      .append('type', this.model.type);
    const myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    this.http.get(environment.serverEndpoint + '/getPlacesInRadius', { params: parameters }).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
      console.log(data);
      this.submitted = true;
    });
  }

  ngOnInit() {
  }

}
