import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Player } from '../../models/player';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';
import { TTRoute } from '../../routing.constants';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-tt-user-registration',
  templateUrl: './tt-user-registration.component.html',
  styleUrls: ['./tt-user-registration.component.css'],
})
export class TtUserRegistrationComponent implements OnInit {
  loginLabels: string[][];
  signupLabels: string[][];
  userId: string;
  pin: number;
  loggedInUser: Player;
  // userFullName: string;
  // userEmail: string;
  // userPassword: string;
  // locationCity: string;
  // locationState: string;
  // locationZipcode: string;
  // club: string;
  userFullName = 'Test';
  userEmail = 't@gmail.com';
  userPassword = '1111';
  locationCity = 'miami';
  locationState = 'FL';
  locationZipcode = '33024';
  club = 'SPTTC';

  loggedinUserSubject: Observable<Player>;

  constructor(
    private router: Router,
    private userService: UserService,
    private coockieService: CookieService
  ) {
    this.loginLabels = [
      ['UserID', 'Phone or Email', 'erieljr1@gmail.com'],
      ['PIN', 'ex: 123456', '1111'],
    ];

    this.signupLabels = [
      ['Full Name', 'ex: John Doe', ''],
      ['UserID', 'Phone or Email', ''],
      ['PIN', 'ex: 123456', ''],
    ];

    this.loggedinUserSubject = userService.genLoggedInUser();
  }

  ngOnInit(): void {
    if (this.userService.hasLoggedInUser()) {
      alert('Already logged in');
      this.router.navigate([TTRoute.HOME]);
    }

    this.loggedinUserSubject.subscribe((user: Player) => {
      this.router.navigate(['/home']);
    });
  }

  login(): void {
    this.userService.login(this.userEmail, this.userPassword);
  }

  signup(): void {
    this.userService.signup(
      this.userFullName,
      this.userEmail,
      this.userPassword,
      this.locationCity,
      this.locationState,
      this.locationZipcode,
      this.club
    );
  }
}
