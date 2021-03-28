import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Player } from '../../models/player';

@Component({
  selector: 'app-tt-autocomplete-search',
  templateUrl: './tt-autocomplete-search.component.html',
  styleUrls: ['./tt-autocomplete-search.component.css'],
})
export class TtAutocompleteSearchComponent implements OnInit {
  @Input() allPlayerNames: Player[];

  @Output() addPlayer = new EventEmitter<Player>();

  myControl = new FormControl();
  filteredPlayerNames: Observable<Player[]>;

  noMatch = false;
  noop = true;
  added = false;
  player: Player;
  searchString: string;

  constructor() {}

  ngOnInit(): void {
    console.log('this.allPlayerNames');
    console.log(this.allPlayerNames);
    this.filteredPlayerNames = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  playerSelected(playerName: string): void {
    this.player = this.allPlayerNames.find(
      (player) => player.name.toLowerCase() === playerName.toLowerCase()
    );
  }

  private _filter(name: string): Player[] {
    const filterValue = name.toLowerCase();

    const players = this.allPlayerNames.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
    if (players.length === 0) {
      this.noMatch = true;
    }
    return players;
  }

  public addPlayerButtonClick(): void {
    // If search does not match any layer, send shell of new player
    if (
      this.player &&
      this.searchString.toLowerCase() === this.player.name.toLowerCase()
    ) {
      this.addPlayer.emit(this.player);
    } else {
      const p: Player = {
        id: undefined,
        rating: undefined,
        name: this.searchString,
      };
      this.addPlayer.emit(p);
    }
    this.player = undefined;
    this.searchString = '';
  }
}
