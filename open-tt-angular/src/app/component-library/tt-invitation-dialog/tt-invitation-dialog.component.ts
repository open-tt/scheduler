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
  times = [1, 2, 3, 4];
  host: Player;
  recipient: Player;
  kind = 'play';
  date: Date = new Date();
  start = '18:00:00';
  end = '20:00:00';
  note = 'Let play some TT!';
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
      host: this.host.name,
      recipient: this.recipient.name,
      kind: ReservationType.Play,
      event_date: new Date().toDateString(),
      start_time: null,
      end_time: null,
      note: this.note,
    };
  }

  sendInvite(): void {
    const data = {
      host: this.host.id,
      recipient: this.recipient.id,
      kind: this.kind,
      event_date: this.date,
      start_time: this.start,
      end_time: this.end,
      note: this.note,
    };
    this.reservationService.playerInvitation(data);

    this.dialogRef.close();
  }
}
