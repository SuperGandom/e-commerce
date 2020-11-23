import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {EcommerceComponent} from "./ecommerce/ecommerce.component"
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes:Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'ecommerce',
      pathMatch:'full'
    },
    {
      path: 'ecommerce',
      component: EcommerceComponent
    },
    {
      path: 'product/:productId',
      component: ProductComponent
    },
    {
      path: 'shopping-cart',
      component: ShoppingCartComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'contactUs',
      component: ContactUsComponent
    },
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
