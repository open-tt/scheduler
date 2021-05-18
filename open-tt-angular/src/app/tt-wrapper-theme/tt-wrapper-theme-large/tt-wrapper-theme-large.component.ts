import { Component, OnInit } from '@angular/core';
import { ComponentMode } from '../../utils/enums';
import { environment } from '../../../environments/environment';
import { TTRoute } from '../../routing.constants';
import { CookieService } from '../../services/cookie.service';
import { UserService } from '../../services/user.service';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tt-wrapper-theme-large',
  templateUrl: './tt-wrapper-theme-large.component.html',
  styleUrls: ['./tt-wrapper-theme-large.component.css'],
})
export class TtWrapperThemeLargeComponent implements OnInit {
  mode = ComponentMode.SHOW;
  enableHomePage = environment.enable_home_page;
  enableRegistrationPage = environment.enable_registration_page;
  enableTournamentsPage = environment.enable_handicap_page;
  enableReservationsPage = environment.enable_reservations_page;
  enableOrgPage = false;
  enableAdmissionsPage = false;
  enableMembershipPage = false;
  enableMembershipSummaryPage = false;
  enableLogout = true;

  tournamentsPageTitle = 'Tournaments';
  homePageTitle = 'Home';
  reservationsPageTitle = 'Invitations';

  tournamentsPageRoute = TTRoute.TOURNAMENT_HANDICAP;
  homePageRoute = TTRoute.HOME;
  reservationsPageRoute = TTRoute.RESERVATIONS;

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
