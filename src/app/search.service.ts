import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { Search } from './search';

@Injectable()
export class SearchService {

  private resultSource = new Subject<any>();

  result$ = this.resultSource.asObservable();

  constructor( private http: HttpClient ) { }

  //this is an util method to return YYYYMMDD date Strign
  formatDate(date: Date): string {
    const mm = date.getMonth() + 1; //getMonth is zero Indexed
    const dd =date.getDate();

    return `${date.getFullYear()}${mm > 9 ? mm : '0' + mm}${dd > 9 ? dd : '0' + dd}`;
  }

  //this method is to convert a dictionary to url param string
  objToUrlParams(params): string {
    let toret = '';

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        toret += `${key}=${encodeURIComponent(params[key])}&`;
      }
    }

    return toret;
  }

  getSearchResults(model: Search) {
    const baseUrl = 'http://developer.goibibo.com';
    const endPoint = '/api/bus/search/';

    const params = {
      app_id: '2db00098',
      app_key: 'ad8f03752322e5f4afce7ffd674561e6',
      format: 'json',
      source: model.origin,
      destination: model.destination,
      dateofdeparture: this.formatDate(model.departureDate),
      dateofarrival: this.formatDate(model.arrivalDate)
    }

    const url = `${baseUrl}${endPoint}?${this.objToUrlParams(params)}`;

    this.http.get(url).subscribe(data => {
      this.resultSource.next(data['data']);
    });
  }

}
