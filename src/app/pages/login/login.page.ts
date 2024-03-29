import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formulario = new FormGroup({ 
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  public message = '';
  public isToastOpen = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public setOpen(state:boolean) {
    this.isToastOpen = state;

  }

  public async onSubmit() {
    try {
    const { email, password } = this.formulario.value;
    if(!email || !password) return;
    const message = await this.authService.signInWithEmail(email, password);
      this.message = message;
      this.router.navigateByUrl('/home');
    } catch (message: any) {
      this.message = message;     
    } finally {
      this.setOpen(true);
    }
  }

  public onClick() {
    this.authService.signGoogle()
    .then(response =>{
      console.log(response);
      this.router.navigateByUrl('/home');
    })
    .catch(error => console.log(error))
  }
}
