import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StarshipCardComponent } from '../../../starship-card/starship-card.component';
import { ApiService } from '../../../../service/api.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Starship } from '../../../../models/starship.model'; // Crear un model per a Starship

@Component({
  selector: 'app-starships-view',
  imports: [CommonModule, StarshipCardComponent],
  templateUrl: './starships-view.component.html',
  styleUrl: './starships-view.component.scss',
})
export class StarshipsViewComponent implements OnInit {
  starshipsList: Starship[] = [];
  starshipId: string | null = null;

  constructor(
    public apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  goToStarshipDetails(id: string) {
    if (id) {
      this.router.navigate(['/starships', id]);
    } else {
      console.error('Invalid starship ID');
    }
  }

  ngOnInit(): void {
    this.starshipId = this.route.snapshot.paramMap.get('id');
    if (this.starshipId) {
      console.log(`Starship ID: ${this.starshipId}`);
    }
    this.apiService.getStarships().subscribe({
      next: (data: any) => {
        this.starshipsList = data.results;
        console.log(this.starshipsList);
      },
      error: (err) => {
        console.error('Error fetching starships:', err);
      },
    });
  }

  public extractStarshipId(url: string): string {
    const segments = url.split('/').filter((segment) => segment);
    return segments.pop() || '';
  }

  loadMoreStarships() {
    this.apiService.getNextStarships().subscribe({
      next: (data: any) => {
        this.apiService.nextPageUrl = data.next;
        this.starshipsList = [...this.starshipsList, ...data.results];
        console.log(this.apiService.nextPageUrl);
      },
      error: (err) => {
        console.error('Error loading more starships:', err);
      },
    });
  }
}
