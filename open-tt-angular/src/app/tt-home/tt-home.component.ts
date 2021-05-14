import { Component, OnInit } from '@angular/core';
import { LabeledContent } from '../component-library/tt-labeled-info-group/tt-labeled-info-group.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tt-home',
  templateUrl: './tt-home.component.html',
  styleUrls: ['./tt-home.component.scss'],
})
export class TtHomeComponent implements OnInit {
  userInfo: LabeledContent[];
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  allPlayers: Player[];
  playerNameQuery: string;
  cityQuery: string;
  zipcodeQuery: string;
  clubQuery: string;
  ratingQuery: string;

  playerUniverseSubscription: Subscription;

  constructor(
    private playerService: PlayerService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.hasLoggedInUser()) {
      this.router.navigate(['/registrations']);
      return;
    }

    if (this.userService.loggedInUser === undefined) {
      this.userService.loadUser();
    }
    this.playerUniverseSubscription = this.playerService
      .genPlayerUniverse()
      .subscribe((players: Player[]) => {
        this.allPlayers = players;
      });
    this.playerService.loadAllPlayers();
  }

  searchPlayers(): void {
    this.playerService
      .searchByName(this.playerNameQuery)
      .subscribe((players: Player[]) => {
        this.allPlayers = players;
      });
  }
}
