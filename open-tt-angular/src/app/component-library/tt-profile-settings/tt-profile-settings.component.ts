import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-tt-profile-settings',
  templateUrl: './tt-profile-settings.component.html',
  styleUrls: ['./tt-profile-settings.component.scss'],
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

  password: string;
  newPassword: string;
  passwordConfirmation: string;

  constructor(
    private userService: UserService,
    private flashMessageService: FlashMessagesService
  ) {
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
    this.userService.updatePlayer(this.player);
    this.isUpdatingAccount = false;
  }

  savePassword(): void {
    this.userService.changePassword(
      this.password,
      this.newPassword,
      this.passwordConfirmation
    );
    this.password = '';
    this.newPassword = '';
    this.passwordConfirmation = '';
  }

  editTtProfile(): void {
    this.isUpdatingTtProfile = true;
  }

  saveTtProfile(): void {
    this.userService.updatePlayer(this.player);
    this.isUpdatingTtProfile = false;
  }

  validPasswordChange(): boolean {
    return !!this.password && !!this.newPassword && !!this.passwordConfirmation;
  }
}
