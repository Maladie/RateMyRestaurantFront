import { Component, OnInit } from '@angular/core';
import {SearchInRadius} from '../SearchInRadius';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
 model;
 submitted;
 results: string[];
  constructor(private http: HttpClient) {
    this.model = new SearchInRadius(0, 0, 0, 'bar');
    this.submitted = false;
  }
  onSubmit(f: NgForm) {
    this.submitted = true;
    console.log('in onSubmit');
    console.log(f);
    this.http.get(environment.serverEndpoint + '/getPlacesInRadius').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
      console.log('retrieved!');
    });
  }

  ngOnInit() {
  }

}
