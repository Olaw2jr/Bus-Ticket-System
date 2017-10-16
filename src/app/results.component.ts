import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SearchService } from './search.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  subscription: Subscription;
  results: object;

  constructor(private service: SearchService) {
    this.subscription = service.result$.subscribe(results => {
      this.results = results;
    });
  }

  ngOnInit() {
  }

}
