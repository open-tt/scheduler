import { Component, OnInit } from '@angular/core';
import { LabeledContent } from '../../component-library/tt-labeled-info-group/tt-labeled-info-group.component';
import { Player } from '../../models/player';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tt-home-large',
  templateUrl: './tt-home-large.component.html',
  styleUrls: ['./tt-home-large.component.css'],
})
export class TtHomeLargeComponent implements OnInit {
  userInfo: LabeledContent[];
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  players: Player[];
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

    this.playerUniverseSubscription = this.playerService
      .genDisplayablePlayersSubject()
      .subscribe((players: Player[]) => {
        this.players = players;
      });
    if (this.userService.loggedInUser === undefined) {
      this.userService.loadUser();
    }
    this.playerService.loadAllPlayers();
  }

  searchPlayers($event: Event): void {
    // @ts-ignore
    const name = $event.target.value;
    this.playerService.search({ name });
  }
}
