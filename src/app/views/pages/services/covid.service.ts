import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
    public BASE_URL = "http://localhost:3000"
    constructor(private http: HttpClient, public router: Router) { }


    // Authentication/Authorization
    getCasesStatus(country): Observable<any> {
      var httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*' ,
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
	      "x-rapidapi-key": "c1ae6c0670msh4f278744c733234p14f624jsn46aa70cf3ccd"
       })
        const url = `${'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country='}${country}`;
        return this.http.get(url, { headers: httpHeaders })
    }

    getUsersData(){
      var httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*' 
       })
        const url = `${this.BASE_URL}/${'user'}`;
        return this.http.get(url, { headers: httpHeaders })
    }

    getUserById(id){
      console.log(id)
      var httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*' 
       })
        const url = `${this.BASE_URL}/${'user/getUserInfoById'}/${id}`;
        return this.http.get(url, { headers: httpHeaders })
    }

    updateUserTest(body){
      var httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*' 
       })
        const url = `${this.BASE_URL}/${'user/update'}`;
        return this.http.put(url,body, { headers: httpHeaders })
    }


    getPatients(){
      var httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*' 
       })
        const url = `${this.BASE_URL}/${'user/getPatients'}`;
        return this.http.get(url, { headers: httpHeaders })
    }

    
}
