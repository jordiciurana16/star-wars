import { Component } from '@angular/core';
import { DatabaseService } from '../../../service/database.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [FormsModule],
})
export class SignUpComponent {
  email: string = '';
  password: string = '';

  constructor(private databaseService: DatabaseService) {}

  async onSignUp() {
    try {
      const user = await this.databaseService.signUp(this.email, this.password);
      console.log('User signed up successfully:', user);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }
}
