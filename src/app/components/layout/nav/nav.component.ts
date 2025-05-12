import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  providers: [ApiService, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(private apiService: ApiService, private router: Router) {}
  starships: any[] = [];
  starshipsPage() {
    this.apiService.getStarships().subscribe((data) => {
      console.log('Starships data:', data);
      this.starships = data;
      this.router.navigate(['/starships']);
    });
  }

  homePage() {
    this.router.navigate(['/']);
  }
}
