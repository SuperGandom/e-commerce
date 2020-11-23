import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private route:Router
    ) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.route.navigateByUrl('');
  }
 

}
