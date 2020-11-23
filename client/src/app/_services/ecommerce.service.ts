import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Patient, Consult } from '../_model/user';
import { ArrayType } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {
  }

  public getCategories(key) {
    const fileUrl = this.baseUrl + "ecommerce/categories/"+key;
    return this.http.get<any>(fileUrl);
  }

  public getProductsByCategory(sendData) {
    const fileUrl = this.baseUrl + "ecommerce/getByCategory";
    return this.http.post<any>(fileUrl,sendData);
  }

  public getProductsByBrand(sendData) {
    const fileUrl = this.baseUrl + "ecommerce/getByBrand";
    return this.http.post<any>(fileUrl,sendData);
  }

  public getBrands(key) {
    const fileUrl = this.baseUrl + "ecommerce/brands/"+key;
    return this.http.get<any>(fileUrl);
  }

  public getOneProduct(productId) {
    const fileUrl = this.baseUrl + "ecommerce/oneProduct/"+productId;
    return this.http.get<any>(fileUrl);
  }

  public getAllProducts() {
    const fileUrl = this.baseUrl + "ecommerce";
    return this.http.get<any>(fileUrl);
  }

  public addToCart(sendData) {
    const fileUrl = this.baseUrl + "ecommerce/addToCart";
    return this.http.post<any>(fileUrl,sendData);
  }

  public getCartByUser(username) {
    const fileUrl = this.baseUrl + "ecommerce/getCartByUser/"+username;
    return this.http.get<any>(fileUrl);
  }

  public deleteCart(orderId) {
    const fileUrl = this.baseUrl + "ecommerce/deleteCart/"+orderId;
    return this.http.delete<any>(fileUrl);
  }

  public changeCount(key,orderId) {
    const fileUrl = this.baseUrl + "ecommerce/changeCount/"+key+"/"+orderId;
    return this.http.get<any>(fileUrl);
  }

  public getRelativeProducts(productId, category) {
    const fileUrl = this.baseUrl + "ecommerce/relativeProduct/"+productId+"/"+category;
    return this.http.get<any>(fileUrl);
  }

  

 




}

