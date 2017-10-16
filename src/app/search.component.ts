import { Component, OnInit } from '@angular/core';
import { Search } from './search';

import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  model: Search;

  constructor( private service: SearchService ) { }

  onSubmit() {
    this.service.getSearchResults(this.model);
    console.log('I am Clicked!');
  }

  ngOnInit() {
    this.model = { tripType: 0, origin: 'Bangalore', destination: 'Hyderabad', departureDate: new Date(), arrivalDate: new Date() };
  }

}
