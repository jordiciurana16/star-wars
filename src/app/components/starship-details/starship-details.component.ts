import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-starship-details',
  imports: [],
  templateUrl: './starship-details.component.html',
  styleUrl: './starship-details.component.scss',
})
export class StarshipDetailsComponent implements OnInit {
  starshipDetails: any = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const starshipId = this.route.snapshot.paramMap.get('id');
    if (starshipId) {
      this.apiService.getStarshipId(+starshipId).subscribe((data) => {
        this.starshipDetails = data;
      });
    }
  }
}
