import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceService } from './../../_services/ecommerce.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  username:any;

  iteralData:any;
  display=false;

  totalPrice:any;

  constructor(
    private router:Router,
    private ecommerceService:EcommerceService
    ) { 
    console.log('sdfsdf')
    // console.log(this.router.getCurrentNavigation().extras.state.productData);

  }

  ngOnInit(): void {
    this.username=localStorage.getItem('username');
    this.ecommerceService.getCartByUser(this.username).subscribe(res=>{
      console.log('res')
      console.log(res)
      this.iteralData=res;
      this.display=true;
      this.getTotalPrice();  
    })
  }

  deleteCart(orderId,idx){
    this.ecommerceService.deleteCart(orderId).subscribe(res=>{
      if(res)
      this.iteralData.splice(idx,1);
      this.getTotalPrice();
    })
  }

  changeCount(orderId,idx,key){
    this.ecommerceService.changeCount(key,orderId).subscribe(res=>{
      if(res==='default')
      return;
  
      this.iteralData[idx].quantity=res.quantity;
      this.iteralData[idx].total=res.total;
      this.getTotalPrice();
    })
  }

  getTotalPrice(){
    this.totalPrice=0;
    this.iteralData.forEach(element => {
 
      this.totalPrice=this.totalPrice+element.total;
    });

  }


}
