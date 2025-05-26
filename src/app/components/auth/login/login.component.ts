import { Component } from '@angular/core';
import { DatabaseService } from '../../../service/database.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  async onLogin() {
    try {
      const data = await this.databaseService.logIn(this.email, this.password);
      alert('User logged in successfully:' + data);
      this.router.navigate(['/starships']);
    } catch (error) {
      alert('Error logging in:' + error);
    }
  }
}
