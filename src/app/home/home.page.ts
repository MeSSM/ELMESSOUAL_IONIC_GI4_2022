import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  passwordMatch:boolean = false;
  toggled: boolean = false;
  loading: boolean = false;
  constructor(private db : DatabaseService, private router : Router) {
  }

  userLogin = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('')
  });

  userSignUp = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
    passwordConf: new FormControl('')
  });
  



  loginForm() : void {
    this.toggleLoading();
    let credentials = this.userLogin.value;
    this.userLogin.reset();
    this.userLogin.markAsUntouched();

    this.db.loginUser(credentials).then(u => {
        if (u != null) {
          this.router.navigate(['/profile']);
        }
        else {
          this.displayLoginError();
        }
        this.toggleLoading();
    });
    
  }

  signupForm() : void {
    this.toggleLoading();
    let user = this.userSignUp.value;
    delete user['passwordConf'];
    user['favorite'] = [];
    user['enrollement'] = [];
    this.db.registerUser(user).then(e => {
      this.toggleLoading();
      this.router.navigate(['/profile']);
    }).catch(err =>{
      this.displaySignupError();
      this.toggleLoading();
    }); 
    
  }

  toggleForm(toggleBtn, toggleIcon,toggleText , formContainer) : void {
    if (!this.toggled){
      this.toggled = !this.toggled;
      formContainer.style.transform = 'translateX(calc(-100vw + 20px))';
      toggleIcon.style.transform = 'rotateY(180deg)';
      toggleBtn.style.flexDirection = 'row-reverse';
      toggleBtn.style.transform = 'translateX(calc(-100vw + 140px))';
      toggleText.innerText = 'Log In';
    } else {
      this.toggled = !this.toggled;
      formContainer.style.transform = '';
      toggleIcon.style.transform = 'rotateY(0)';
      toggleBtn.style.flexDirection = 'row';
      toggleBtn.style.transform = '';
      toggleText.innerText = 'Sign Up';
    }
  }

  getError(error : any) : string{
    if(error == "pattern") return "Incorrect format"
    else if (error == "email") return "Incorrect email format."
    else return "Required"
  }

  getKey(field : any) : string{
    switch(field){
      case('firstName'):
        return "First Name"
      case('lastName'):
        return "Last Name"
      case('phone'):
        return "Phone number"
      case('email'):
        return "Email" 
      case('password'):
        return "Password" 
      case('passwordConf'):
        return "Password Confirmation"
    }
    return "None"
  }

  passwordConfirmation() : void{
    console.log('password: ' + this.userSignUp.value.password + '\tConfirm : ' + this.userSignUp.value.passwordConf)
    if (this.userSignUp.value.password == this.userSignUp.value.passwordConf) this.passwordMatch =true;
    else this.passwordMatch = false;
  }


  toggleLoading() : void {
    let spinner = document.querySelector('.loading-container') as HTMLElement;
    let forms = document.querySelector('.forms') as HTMLElement;
    if (!this.loading){
      spinner.style.display = 'flex';
      forms.style.filter = 'blur(3px)'
      this.loading = !this.loading;
    }else{
      spinner.style.display = 'none';
      forms.style.filter = '';
      this.loading = !this.loading;
    }
  }


  displayLoginError() : void {
    let loginError = document.querySelector('.login-error') as HTMLElement;
    loginError.style.opacity = '0.9';
    loginError.style.zIndex = '10';
    setTimeout(() => {
      loginError.style.opacity = '0';
      loginError.style.zIndex = '-10';
    }, 2000)
  }

  displaySignupError() : void {
    let loginError = document.querySelector('.signup-error') as HTMLElement;
    loginError.style.opacity = '0.9';
    loginError.style.zIndex = '10';
    setTimeout(() => {
      loginError.style.opacity = '0';
      loginError.style.zIndex = '-10';
    }, 2000)
  }


}
