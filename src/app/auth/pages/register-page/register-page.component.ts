import { AuthService } from '@/auth/services/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);

  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['test1@google.com', [Validators.required, Validators.email]],
    password: ['Abc123', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if(this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { fullName = '', email = '', password = ''} = this.registerForm.value;

    this.authService
      .register(fullName!, email!, password!)
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/');
          return;
        }

        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
      });
  }
}
