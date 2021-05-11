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
  enableOrgPage = false;
  enableAdmissionsPage = false;
  enableMembershipPage = false;
  enableMembershipSummaryPage = false;

  tournamentsPageTitle = 'Tournaments';
  homePageTitle = 'Home';
  reservationsPageTitle = 'Invitations';

  tournamentsPageRoute = TTRoute.TOURNAMENT_HANDICAP;
  homePageRoute = TTRoute.HOME;
  reservationsPageRoute = TTRoute.RESERVATIONS;

  events: string[] = [];
  opened: boolean;

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Global Theme');
    if (this.cookieService.hasLoggedInUser()) {
      console.log('A');
      this.userService.userApiToken = this.cookieService.getAuthTokenCookie();
      this.userService.loadUser();
    }
    console.log('B');
    this.playerService.loadAllPlayers();
  }

  hasLoggedInUser(): boolean {
    return this.cookieService.hasLoggedInUser();
  }
}
