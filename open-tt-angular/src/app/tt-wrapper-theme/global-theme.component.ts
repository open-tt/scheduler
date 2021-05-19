import { Component, OnInit } from '@angular/core';
import { ComponentMode } from '../utils/enums';
import { environment } from '../../environments/environment';
import { CookieService } from '../services/cookie.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TTRoute } from '../routing.constants';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-global-theme',
  templateUrl: './global-theme.component.html',
  styleUrls: ['./global-theme.component.scss'],
})
export class GlobalThemeComponent implements OnInit {
  mode = ComponentMode.SHOW;
  enableHomePage = environment.enable_home_page;
  enableRegistrationPage = environment.enable_registration_page;
  enableTournamentsPage = environment.enable_handicap_page;
  enableReservationsPage = environment.enable_reservations_page;
  enableAdmissionsPage = false;
  enableMembershipPage = false;
  enableLogout = true;

  homePageTitle = 'Home';

  homePageRoute = TTRoute.HOME;

  opened = true;

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.cookieService.hasLoggedInUser()) {
      this.userService.loadUser();
      this.playerService.loadAllPlayers();
    }
  }

  shouldEnableLogout(): boolean {
    return this.enableLogout && this.userService.hasLoggedInUser();
  }

  shouldEnableReservationsButton(): boolean {
    return this.enableReservationsPage && this.hasLoggedInUser();
  }

  hasLoggedInUser(): boolean {
    return this.cookieService.hasLoggedInUser();
  }

  logout(): void {
    this.cookieService.removeUserToken();
    this.goto('/registrations');
  }

  goto(homePageRoute: string): void {
    this.router.navigate([homePageRoute]);
  }

  isPageSelected(pagePath: string): boolean {
    return this.router.url === pagePath;
  }
}
