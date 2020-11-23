import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment as env} from "../../environments/environment";
import { LocalstorageService } from './localStorage.service';

const tokenName = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isLogged$ = new BehaviorSubject(false);
  private user = { username: 'Luke', email: 'Luke@skywalker.com' }; // some data about user

  constructor(
    private http: HttpClient,
    private localstorageService:LocalstorageService
    ) {

  }

  public isLoggedIn(){
    return this.localstorageService.getItem('token') !== null; }

  public login(data): Observable<any> {
    const logInUrl=baseUrl+'auth/login';
    return this.http.post(logInUrl, data)
      .pipe(
        map((res: { user: any, token: string }) => {
          console.log('res')
          console.log(res)
          this.user = res.user;
          this.localstorageService.setItem(tokenName, res.token);
          // only for example
          this.localstorageService.setItem('username', res.user.username);
          this.isLogged$.next(true);
          return this.user;
        }));
  }

  public logout() {
    const logOutUrl=baseUrl+'auth/logout';

    return this.http.get(logOutUrl)
      .pipe(map((data) => {
        this.localstorageService.clear();
        this.user = null;
        this.isLogged$.next(false);
        return of(false);
      }));
  }



  public signup(data) {
    const signUpUrl=baseUrl+'auth/register';

    return this.http.post(signUpUrl, data)
      .pipe(
        map((res: any) => {
          if(!res.user)
          return res;
          this.user = res.user;
        this.localstorageService.setItem(tokenName, res.token);
          // only for example
          this.localstorageService.setItem('username', res.user.username);
          this.isLogged$.next(true);
          return res;
        }));
  }

  

  public get authToken(): string {
    return localStorage.getItem(tokenName);
  }

  public get userData(): Observable<any> {
    // send current user or load data from backend using token
    return this.loadUser();
  }

  private loadUser(): Observable<any> {
    // use request to load user data with token
    // it's fake and useing only for example
    if (localStorage.getItem('username') && localStorage.getItem('email')) {
      this.user = {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
      };
    }
    return of(this.user);
  }

  public emailVerify(token) {
    const emailVerifyUrl = baseUrl + "auth/verify-email";
    return this.http.post<any>(emailVerifyUrl, {token:token});
  }
}
export const baseUrl = env.baseUrl;
