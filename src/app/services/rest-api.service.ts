import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient,) { }
  categorySpecific_response:any;
  // -----------------------------DASHBOARD - category6-----------------------------------
  async categorySpecific(){
    await this.http.get(`https://mission360.ddns.net/api/v1/category/Business`).toPromise()
      .then((response) => {
        this.categorySpecific_response = response;
      });
    return this.categorySpecific_response;
  }
}
