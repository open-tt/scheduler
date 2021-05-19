import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TTRoute } from '../../routing.constants';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tt-footer',
  templateUrl: './tt-footer.component.html',
  styleUrls: ['./tt-footer.component.scss'],
})
export class TtFooterComponent implements OnInit {
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

  goto(homePageRoute: string): void {
    this.router.navigate([homePageRoute]);
  }

  logout(): void {
    this.cookieService.removeUserToken();
    this.goto('/registrations');
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
}
