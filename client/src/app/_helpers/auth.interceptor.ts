import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";

const TOKEN_HEADER_KEY = 'authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.authService.getToken();
    /*console.log("intercept");
    console.log("token");
    console.log(token);*/
    const now = new Date();
    const tokenExpiredTime = JSON.parse(localStorage.getItem('tokenExpiredTime'));
    /*console.log("tokenExpiredTime");
    console.log(tokenExpiredTime);*/

    /*console.log("authReq");
    console.log(authReq.url);*/
    let index = authReq.url.indexOf( "aws" ); 
    if(index>0){
      return next.handle(authReq);      
    }else{
      if (token != null) {
        if(now.getTime() - tokenExpiredTime > 0) {
          this.handleExpiredToken();
        } else{
          authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
          /*console.log("authReq");
          console.log(authReq);*/
        }
      }
    }

    return next.handle(authReq);
  }

  private handleExpiredToken() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
