import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {ActivatedRoute,  Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  authForm: FormGroup;
  isSubmitted  =  false;
  isLoginFailed: boolean = false;
  isApproved: boolean = true;
  isActive: boolean = true;
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.authForm  =  this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    //When user approved, verify his email.
    const token: string = this.route.snapshot.params.url;
    if(token) {
      this.authService.emailVerify(token).subscribe(res=> {
        console.log("email verify success", res);
        this.router.navigateByUrl('/auth/sign-in');
      });
    }
  }

  get formControls() { return this.authForm.controls; }

  signIn(){
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
     this.authService.login(this.authForm.value).subscribe( res => {
       console.log('res')
       console.log(res)
        this.router.navigateByUrl('/dashboard/ecommerce')
    }, error => {
      this.isLoginFailed = !!error;
     }
   );
  }

  gotoRegister(){
    this.router.navigateByUrl('/auth/sign-up/provider')
  }

  allowLogin(res) {
    if (res.user.role === "Admin") {
      this.router.navigateByUrl('/dashboard/admin')
    } else {
      this.router.navigateByUrl('/dashboard/health-provider')
    }
  }
  

}
