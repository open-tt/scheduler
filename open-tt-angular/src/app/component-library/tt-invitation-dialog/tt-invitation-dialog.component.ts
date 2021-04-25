import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation, ReservationType } from '../../models/reservation';
import { Time } from '@angular/common';

@Component({
  selector: 'app-tt-invitation-dialog',
  templateUrl: './tt-invitation-dialog.component.html',
  styleUrls: ['./tt-invitation-dialog.component.scss'],
})
export class TtInvitationDialogComponent implements OnInit {
  inviteTime: number;
  times = [1, 2, 3, 4];
  host: Player;
  recipient: Player;
  reservation: Reservation;

  constructor(
    public dialogRef: MatDialogRef<TtInvitationDialogComponent>,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: { host: Player; recipient: Player }
  ) {
    this.host = data.host;
    this.recipient = data.recipient;
  }

  ngOnInit(): void {
    this.reservation = {
      host: this.host.id,
      recipient: this.recipient.id,
      kind: ReservationType.Play,
      event_date: new Date(),
      start_time: null,
      end_time: null,
    };
  }

  sendInvite(data: {
    date: Date;
    start: Time;
    end: Time;
    kind: ReservationType;
    note: string;
  }): void {
    this.reservation.event_date = data.date;
    this.reservation.start_time = data.start;
    this.reservation.end_time = data.end;
    this.reservation.kind = data.kind;
    this.reservation.note = data.note;

    this.reservationService.playerInvitation(this.reservation);

    this.dialogRef.close();
  }
}
