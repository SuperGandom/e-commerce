import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IgxSliderModule } from 'igniteui-angular';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
@NgModule({
  declarations: [

  ProfileComponent,

  ContactUsComponent],
  imports: [
    ReactiveFormsModule,
    DashboardRoutingModule,
    CommonModule,
    IgxSliderModule,
    ],
    exports:[

    ],
  providers: [],
  entryComponents: []
})
export class DashboardModule { }
