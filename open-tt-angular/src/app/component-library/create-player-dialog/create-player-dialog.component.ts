import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../../models/player';

@Component({
  selector: 'app-create-player-dialog',
  templateUrl: './create-player-dialog.component.html',
  styleUrls: ['./create-player-dialog.component.css'],
})
export class CreatePlayerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreatePlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public player: Player
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
