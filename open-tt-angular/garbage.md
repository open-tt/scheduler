### Handicap Tournament Code

    <div fxLayout="column" fxLayoutGap="20px">
      <div fxLayout="row">
        <div fxLayout="column" fxLayoutAlign="space-around stretch" fxFlex="70">
          <app-tt-autocomplete-search [options]="options"></app-tt-autocomplete-search>
        </div>
      </div>
      <div fxLayout="row" fxLayoutGap="1%">
        <div fxLayout="column" fxLayoutAlign="space-around stretch" fxFlex="70" >
          <div fxLayout="row" fxLayoutAlign="space-between">
            <h2 [className]="isPast ? 'accentColorText' : ''">Registration</h2>
            <h2
              class="accentColorText"
              *ngIf="isPast">Past Tournament from {{this.tournament.date | date}}</h2>
            <button
              (click)="backToActiveTournament()"
              *ngIf="isPast"
              mat-mini-fab
              color="accent">
                <mat-icon>close</mat-icon>
            </button>
          </div>
          <app-tt-player-handicap-table [className]="isPast ? 'accentColorBorder' : ''"
                                        [dataSource]="dataSource"></app-tt-player-handicap-table>
        </div>

        <div fxLayout="column">
          <h2>Past Tournaments</h2>
          <table mat-table [dataSource]="prevEvents">
            <ng-container matColumnDef="date">
              <td mat-cell *matCellDef="let tournament"> {{tournament.date | date}} </td>
            </ng-container>

            <ng-container matColumnDef="players">
              <td mat-cell *matCellDef="let tournament"> {{tournament.totalPlayers}} players </td>
            </ng-container>

            <tr mat-row *matRowDef="let row; columns: ['date', 'players'];" (click)="openPastTournament(row)"></tr>
          </table>
        </div>
      </div>
      <div fxLayout="row" *ngFor="let g of playerGroups">
        <app-tt-tournament-group
          class="mat-background-primary"
          [players]="g"></app-tt-tournament-group>
      </div>
    </div>
