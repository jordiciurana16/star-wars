import { Component } from '@angular/core';
import { DatabaseService } from '../../../service/database.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [FormsModule, CommonModule],
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  emailFeedback: boolean = false;

  constructor(private databaseService: DatabaseService) {}

  async onSignUp() {
    try {
      const user = await this.databaseService.signUp(this.email, this.password);
      alert('User signed up successfully:' + user);
      this.emailFeedback = true;
    } catch (error) {
      alert('Error signing up:' + error);
    }
  }
}
