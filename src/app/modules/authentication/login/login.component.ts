import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUtilService } from 'src/app/services/authentication/auth-util.service';
import { LoginService } from 'src/app/services/authentication/login.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, 
    private authUtil: AuthUtilService, private snackBar:SnackbarService) { }

  loginForm: FormGroup;
  returnUrl;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['return'] || '/');
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  get f() {
    return this.loginForm.controls;
  }

  //faz login
  public login(): void {
    this.loginService
      .login(this.f["username"].value, this.f['password'].value)
      .subscribe(
        (data) => {
          var token = JSON.parse(data);
                    
          localStorage.setItem('token', "Bearer " + token.token);
          this.authUtil.currentTokenValue = "Bearer " + token.token;
          // redireciona a view          
          this.router.navigateByUrl(this.returnUrl);
        },
        (error) => {
          console.log(error);
          if (error.status == 401) {
            // this.notificationService.showMessage("login error","username or password is invalid")
            alert("username or password is invalid");
            this.snackBar.openSnackBarTopCenter("username or password is invalid")
            //this.snackbarService.openSnackBarTopCenter("Suas credenciais de acesso estão inválidas!");
          } else {

            alert(error.error);
          }
        }
      );
  }

  public isLogged() {
    return this.authUtil.isLogged();//retorna true ou false
  }

  public logout() {
    this.authUtil.logout();
    this.router.navigate(['']);
  }



}
