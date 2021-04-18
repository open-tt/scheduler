import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tt-profile-settings',
  templateUrl: './tt-profile-settings.component.html',
  styleUrls: ['./tt-profile-settings.component.css'],
})
export class TtProfileSettingsComponent implements OnInit {
  player: Player = {
    id: 0,
    name: '',
    tournamentrating: 0,
  };

  signedInPlayerSubscription: Subscription;

  isUpdatingAccount = false;
  isUpdatingTtProfile = false;

  constructor(private userService: UserService) {
    this.signedInPlayerSubscription = this.userService
      .genLoggedInUser()
      .subscribe((p: Player) => (this.player = p));
  }

  ngOnInit(): void {
    this.player = this.userService.loggedInUser;
  }
  editAccount(): void {
    this.isUpdatingAccount = true;
  }

  saveAccount(): void {
    // this.userService.updatePlayer(this.player);
    this.isUpdatingAccount = false;
  }

  savePassword(): void {}

  editTtProfile(): void {
    this.isUpdatingTtProfile = true;
  }

  saveTtProfile(): void {
    this.isUpdatingTtProfile = false;
  }
}
