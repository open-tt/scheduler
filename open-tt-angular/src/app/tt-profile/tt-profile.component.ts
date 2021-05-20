import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-tt-profile',
  templateUrl: './tt-profile.component.html',
  styleUrls: ['./tt-profile.component.scss'],
})
export class TtProfileComponent implements OnInit {
  player: Player;
  loggedInUserSubscription: Subscription;
  ratings = [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400];
  editMode = false;
  partnerMinRating: number;
  playerRating: number;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.hasLoggedInUser()) {
      this.router.navigate(['/registration']);
    }

    this.setValues(this.userService.loggedInUser);
    this.loggedInUserSubscription = this.userService
      .genLoggedInUser()
      .subscribe((p) => this.setValues(p));
  }

  saveChanges(): void {}

  toggleEditMode(): void {
    if (this.editMode) {
      // todo: need to save any changes
      if (!this.player.tt_profile) {
        this.player.tt_profile = {};
      }
      this.player.tt_profile.partner_min_rating = this.partnerMinRating;
      this.player.tt_profile.tournamentrating = this.playerRating;

      this.userService.updatePlayerProfile(this.player);
      this.userService.updateUserProfile(this.player);
    }
    this.editMode = !this.editMode;
  }

  private setValues(p: Player): void {
    this.player = p;
    this.partnerMinRating = this.player?.tt_profile?.partner_min_rating;
    this.playerRating = this.player?.tt_profile?.tournamentrating;
  }

  profileImage(): string {
    if (this.player?.profile_img) {
      return this.player?.profile_img;
    }
    return '/assets/tt-icon.png';
  }
}
