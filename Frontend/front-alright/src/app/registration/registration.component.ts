import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  register() {
    const registrationData = {
      email: this.email,
      password: this.password,
    };

    this.http
      .post<any>('http://localhost:3000/users/register', registrationData)
      .subscribe(
        (response) => {
          // Registro exitoso, realizar acciones adicionales si es necesario
          console.log('Registro exitoso:', response);
        },
        (error) => {
          // Error durante el registro, manejar el error de acuerdo a tus necesidades
          console.error('Error durante el registro:', error);
        }
      );
  }
}
