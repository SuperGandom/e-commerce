import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EcommerceService } from './../../_services/ecommerce.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: any;
  productData: any;
  mainImages = [];
  username: any;

  relativeProducts: any;
  relativeProductsDisplay = false;

  imageKeyArr = [true, false, false, false];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ecommerceService: EcommerceService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(data => {
      this.productId = data.productId;
    })
  }

  ngOnInit(): void {
    this.ecommerceService.getOneProduct(this.productId).subscribe(res => {
      this.productData = res;
      this.mainImages = this.productData.media && this.productData.media.image.slice(0, 4);

      this.getRelative(this.productData._id,this.productData.category);
    })
  }
  addToCart() {
    this.username = localStorage.getItem('username');
    this.ecommerceService.addToCart({ username: this.username, productTitle: this.productData.title,price:this.productData.salePrice })
      .subscribe(res => {
        if (res === 'ok') {
          Swal.fire({
            text: "Added in your cart successfully!",
            confirmButtonText: 'OK'
          }).then((result) => {
            this.router.navigateByUrl('/dashboard/ecommerce')
          })
        }
      })
  }

  ShowRelativeDetail(item) {
    this.productData = item;
    this.mainImages = item.media.image.slice(0, 4);
    this.getRelative(item._id, item.category);

   
  }
  getRelative(id,cate){
    this.ecommerceService.getRelativeProducts(id, cate).subscribe(res => {

      this.relativeProducts = res;
      this.relativeProductsDisplay = true;
      this.imageKeyArr = [true, false, false, false];
    })
  }
  
  ngAfterViewInit() {

  }



}
