import { Component, Input } from '@angular/core';
import { Starship } from '../../models/starship.model';

@Component({
  selector: 'app-starship-card',
  imports: [],
  templateUrl: './starship-card.component.html',
  styleUrl: './starship-card.component.scss',
})
export class StarshipCardComponent {
  @Input() starship!: Starship;
}
