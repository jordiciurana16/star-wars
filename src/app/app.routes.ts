import { Routes } from '@angular/router';
import { HomeViewComponent } from './components/layout/main/home-view/home-view.component';
import { StarshipsViewComponent } from './components/layout/main/starships-view/starships-view.component';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeViewComponent },
  {
    path: 'starships',
    component: StarshipsViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'starships/:id',
    component: StarshipDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LoginComponent },
];
