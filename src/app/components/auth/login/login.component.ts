import { Component } from '@angular/core';
import { DatabaseService } from '../../../service/database.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private databaseService: DatabaseService) {}

  async onLogin() {
    try {
      const data = await this.databaseService.logIn(this.email, this.password);
      alert('User logged in successfully:' + data);
    } catch (error) {
      alert('Error logging in:' + error);
    }
  }
}
