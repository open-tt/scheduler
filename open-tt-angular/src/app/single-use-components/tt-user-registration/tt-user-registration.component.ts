import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Player } from '../../models/player';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';
import { TTRoute } from '../../routing.constants';

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

  constructor(
    private router: Router,
    private userService: UserService,
    private coockieService: CookieService
  ) {
    this.loginLabels = [
      ['UserID', 'Phone or Email', 'erieljr1@gmail.com'],
      ['PIN', 'ex: 123456', '123123'],
    ];

    this.signupLabels = [
      ['Full Name', 'ex: John Doe', ''],
      ['UserID', 'Phone or Email', ''],
      ['PIN', 'ex: 123456', ''],
    ];
    console.log('TEST');
  }

  ngOnInit(): void {
    if (this.userService.hasLoggedInUser()) {
      alert('Already logged in');
      console.log(this.userService.loggedInUser);
      this.router.navigate([TTRoute.HOME]);
    }
    console.log('Not Logged in');
  }

  login(): void {
    const userId = this.loginLabels[0][2];
    const pin = +this.loginLabels[1][2];
    this.userService.login(userId, pin).subscribe(
      (success) => {
        if (!success) {
          console.error('Log In Failed');
          return;
        }
        this.router.navigate(['/home']);
      },
      (error) => console.error('API Error: ', error)
    );
  }

  signup(): void {
    const name = this.signupLabels[0][2];
    const userId = this.signupLabels[1][2];
    const pin = +this.signupLabels[2][2];
    this.userService.signup(name, userId, pin).subscribe(
      (success) => {
        if (!success) {
          console.error(
            `Failed to create user with ${name}, ${userId}, ${pin}`
          );
        }
      },
      (error) => {
        console.error(
          `Create User(${name}, ${userId}, ${pin}) request failed: `,
          error
        );
      }
    );
  }
}
