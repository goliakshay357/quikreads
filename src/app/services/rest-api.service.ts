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
  getBooksByISBN_response: any;
  genreSpecific_response:any;
  
  // -----------------------------DASHBOARD -----------------------------------
  async categorySpecificLimit(parameter:any){
    await this.http.get(`https://mission360.ddns.net/api/v1/category/limit/${parameter}`).toPromise()
      .then((response) => {
        this.categorySpecific_response = response;
      });
    return this.categorySpecific_response;
  }
  
  async latestBooks(parameter:any){
    await this.http.get(`https://mission360.ddns.net/api/v1/latest-books/${parameter}`).toPromise()
      .then((response) => {
        this.latestBooks_response = response;
      });
      console.log(this.latestBooks_response,"latest")
    return this.latestBooks_response;
  }

  // --------------------- BOOKS ---------------------------------------------
  async getBookByISBN(parameter:any){
    await this.http.get(`https://mission360.ddns.net/api/v1/books/get-by-isbn/${parameter}`).toPromise()
    .then((response) => {
      this.getBooksByISBN_response = response;
    });
  return this.getBooksByISBN_response;
  }

  // --------------------- Genre ----------------------------------------------
  async getGenreBooks(parameter:any){
    await this.http.get(`https://mission360.ddns.net/api/v1/category/${parameter}`).toPromise()
      .then((response) => {
        this.genreSpecific_response = response;
      });
    return this.genreSpecific_response;
  }
}
