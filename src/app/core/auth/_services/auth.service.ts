import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    public BASE_URL = "http://localhost:3000"
    constructor(private http: HttpClient, public router: Router) { }


    // Authentication/Authorization
    login(credentials): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('content-type', 'application/json');
        const url = `${this.BASE_URL}/${'auth/local'}`;
        return this.http.post(url, credentials, { headers: httpHeaders,responseType:'json' })
    }

    loginWithGoogle() {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('content-type', 'application/json');
        const url = `${this.BASE_URL}/${'auth/google'}`;
        //window.open(url,'width=800, height=600')
         window.location.href=url;
         return this.http.get(url, { headers: httpHeaders })
    }
    register(body){
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('content-type', 'application/json');
        const url = `http://localhost:3000/user/signup`;
        return this.http.post(url, body, { headers: httpHeaders })
    }



    
}
