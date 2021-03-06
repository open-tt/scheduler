import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TTRoute } from '../../routing.constants';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
  styleUrls: ['./top-navigation-bar.component.css'],
})
export class TopNavigationBarComponent implements OnInit {
  enableHomePage = environment.enable_home_page;
  homePageRoute = TTRoute.HOME;
  homePageTitle = 'Home';
  enableReservationsPage = environment.enable_reservations_page;
  reservationsPageRoute = TTRoute.RESERVATIONS;
  profilePageRoute = TTRoute.PROFILE;
  profilePageTitle = 'Profile';
  reservationsPageTitle = 'Invitations';

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  hasLoggedInUser(): boolean {
    return this.cookieService.hasLoggedInUser();
  }

  shouldEnableReservationsButton(): boolean {
    return this.enableReservationsPage && this.hasLoggedInUser();
  }

  shouldEnableLogout(): boolean {
    return this.userService.hasLoggedInUser();
  }

  shouldEnableProfileButton(): boolean {
    return this.userService.hasLoggedInUser();
  }

  goto(homePageRoute: string): void {
    this.router.navigate([homePageRoute]);
  }

  logout(): void {
    this.cookieService.removeUserToken();
    this.goto('/registrations');
  }
}
