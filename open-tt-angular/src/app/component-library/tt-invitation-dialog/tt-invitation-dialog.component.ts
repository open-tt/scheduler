import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../../models/player';
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
  activity: ReservationType;
  date: Date;
  start: Time;
  end: Time;
  note: string;
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

  sendInvite(): void {
    this.reservation.event_date = this.date;
    this.reservation.start_time = this.start;
    this.reservation.end_time = this.end;
    this.reservation.kind = this.activity;
    this.reservation.note = this.note;
    console.log(this.reservation);

    this.reservationService.playerInvitation(this.reservation);

    this.dialogRef.close();
  }
}
