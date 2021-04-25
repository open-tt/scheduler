import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-tt-profile-settings',
  templateUrl: './tt-profile-settings.component.html',
  styleUrls: ['./tt-profile-settings.component.scss'],
})
export class TtProfileSettingsComponent implements OnInit {
  player: Player = {
    id: 0,
    name: '',
  };

  blade: string;
  forehand: string;
  backhand: string;
  hand: string;
  grip: string;
  minRating: number;
  maxRating: number;

  signedInPlayerSubscription: Subscription;

  isUpdatingAccount = false;
  isUpdatingTtProfile = false;

  password: string;
  newPassword: string;
  passwordConfirmation: string;

  constructor(
    private userService: UserService,
    private playerService: PlayerService,
    private flashMessageService: FlashMessagesService
  ) {
    this.signedInPlayerSubscription = this.userService
      .genLoggedInUser()
      .subscribe((p: Player) => {
        this.player = p;
        this.updateNgModels(this.player);
      });
  }

  ngOnInit(): void {
    this.player = this.userService.loggedInUser;
    this.updateNgModels(this.player);
  }

  private updateNgModels(player: Player): void {
    if (!player) {
      return;
    }
    this.blade = player.tt_profile.blade;
    this.forehand = player.tt_profile.forehand;
    this.backhand = player.tt_profile.backhand;
    this.hand = player.tt_profile.hand;
    this.grip = player.tt_profile.grip;
    this.minRating = player.tt_profile.partner_min_rating;
    this.maxRating = player.tt_profile.partner_max_rating;
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
    this.player.tt_profile.blade = this.blade;
    console.log(this.player.tt_profile.blade);

    this.player.tt_profile.forehand = this.forehand;
    this.player.tt_profile.backhand = this.backhand;
    this.player.tt_profile.hand = this.hand;
    this.player.tt_profile.grip = this.grip;
    this.player.tt_profile.partner_min_rating = this.minRating;
    this.player.tt_profile.partner_max_rating = this.maxRating;

    console.log(this.player);

    this.userService.updatePlayer(this.player);
    this.isUpdatingTtProfile = false;
  }

  validPasswordChange(): boolean {
    return !!this.password && !!this.newPassword && !!this.passwordConfirmation;
  }
}
