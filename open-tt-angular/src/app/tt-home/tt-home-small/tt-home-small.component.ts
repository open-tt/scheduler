import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tt-home-small',
  templateUrl: './tt-home-small.component.html',
  styleUrls: ['./tt-home-small.component.scss'],
})
export class TtHomeSmallComponent implements OnInit {
  query: string;
  players: Player[];
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
