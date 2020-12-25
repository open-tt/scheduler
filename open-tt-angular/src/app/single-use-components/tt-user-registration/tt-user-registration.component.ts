import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Player} from '../../models/player';
import {Router} from '@angular/router';
import {CoockieService} from '../../services/coockie.service';
import {TTRoute} from '../../routing.constants';

@Component({
  selector: 'app-tt-user-registration',
  templateUrl: './tt-user-registration.component.html',
  styleUrls: ['./tt-user-registration.component.css']
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
    private coockieService: CoockieService
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
  }

  ngOnInit(): void {
    if (this.userService.hasLoggedInUser()) {
      this.router.navigate([TTRoute.HOME]);
    }
  }

  login(): void {
    const userId = this.loginLabels[0][2];
    const pin = +this.loginLabels[1][2];
    this.userService.login(userId, pin)
      .subscribe(
        success => {
          if (!success) {
            console.error('Log In Failed');
            return;
          }
          this.router.navigate(['/home']);
        },
        error => console.error('API Error: ', error)
      );
  }

  signup(): void {
    const name = this.signupLabels[0][2];
    const userId = this.signupLabels[1][2];
    const pin = +this.signupLabels[2][2];
    this.userService.signup(name, userId, pin).subscribe(
      success => {
        if (!success) {
          console.error(`Failed to create user with ${name}, ${userId}, ${pin}`);
        }
      },
      error => {
        console.error(`Create User(${name}, ${userId}, ${pin}) request failed: `, error);
      }
    );
  }

}
