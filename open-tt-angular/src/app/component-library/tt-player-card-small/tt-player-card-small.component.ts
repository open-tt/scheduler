import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { TtInvitationDialogComponent } from '../tt-invitation-dialog/tt-invitation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-tt-player-card-small',
  templateUrl: './tt-player-card-small.component.html',
  styleUrls: ['./tt-player-card-small.component.scss'],
})
export class TtPlayerCardSmallComponent implements OnInit {
  @Input() player: Player;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {}

  playerRating(): string {
    return this.player.tt_profile?.tournamentrating
      ? this.player.tt_profile.tournamentrating.toString()
      : 'No Rating';
  }

  playsAt(): string {
    return 'BTTC, FL';
  }

  openDialog(): void {
    const viewportWidth = this.deviceService.isMobile() ? '90%' : '30%';
    const dialogRef = this.dialog.open(TtInvitationDialogComponent, {
      width: viewportWidth,
      data: {
        host: this.userService.loggedInUser,
        recipient: this.player,
      },
    });

    dialogRef.afterClosed().subscribe((invite: object) => {
      if (!invite) {
        return;
      }
      // this.tournamentService.updateSingleMatch(updatedMatch);
    });
  }

  profileImage(): string {
    if (this.player.profile_img) {
      return this.player.profile_img;
    }
    return '/assets/tt-icon.png';
  }
}
