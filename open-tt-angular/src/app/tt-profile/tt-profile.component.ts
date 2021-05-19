import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tt-profile',
  templateUrl: './tt-profile.component.html',
  styleUrls: ['./tt-profile.component.scss'],
})
export class TtProfileComponent implements OnInit {
  player: Player;
  loggedInUserSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.hasLoggedInUser()) {
      this.router.navigate(['/registration']);
    }

    this.player = this.userService.loggedInUser;
    this.loggedInUserSubscription = this.userService
      .genLoggedInUser()
      .subscribe((p) => {
        this.player = p;
      });
  }

  saveChanges(): void {}
}
