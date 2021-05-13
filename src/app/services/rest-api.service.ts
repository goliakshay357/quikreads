import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient,) { 
  }
  categorySpecific_response:any;
  latestBooks_response:any;

  // -----------------------------DASHBOARD -----------------------------------
  async categorySpecificLimit(parameter:any){
    await this.http.get(`https://mission360.ddns.net/api/v1/category/limit/${parameter}`).toPromise()
      .then((response) => {
        this.categorySpecific_response = response;
      });
    return this.categorySpecific_response;
  }
  
  async latestBooks(){
    await this.http.get(`https://mission360.ddns.net/api/v1/latest-books`).toPromise()
      .then((response) => {
        this.latestBooks_response = response;
      });
    return this.latestBooks_response;
  }
}
