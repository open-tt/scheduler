import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playerUniverse: Player[];
  playerUniverseSubject: Subject<Player[]>;

  displayablePlayers: Player[];
  displayablePlayersSubject: Subject<Player[]>;

  constructor(private http2: HttpClient, private http: HttpClient) {
    this.playerUniverseSubject = new Subject<Player[]>();
    this.displayablePlayersSubject = new Subject<Player[]>();
    this.playerUniverse = [];
    this.displayablePlayers = [];
  }

  // Getters and Setters
  genPlayerUniverse(): Observable<Player[]> {
    return this.playerUniverseSubject.asObservable();
  }

  genDisplayablePlayersSubject(): Observable<Player[]> {
    return this.displayablePlayersSubject.asObservable();
  }

  createNewPlayer(name: string, rating: number): Observable<Player> {
    const body = {
      name,
      rating,
    };
    return this.http.post<Player>('/players', body);
  }

  loadAllPlayers(): void {
    this.http.get<Player[]>('/players').subscribe((players: Player[]) => {
      this.playerUniverse = players;
      this.displayablePlayers = players;
      this.playerUniverseSubject.next(this.playerUniverse);
      this.displayablePlayersSubject.next(this.displayablePlayers);
    });
  }

  playerName(id: number): string {
    const player = this.playerUniverse.find((p) => p.id === id);
    return player ? player.name : '';
  }

  search(terms: any): void {
    this.http
      .get<Player[]>('/users', {
        params: terms,
      })
      .subscribe((players) => {
        this.displayablePlayers = players;
        this.displayablePlayersSubject.next(players);
      });
  }

  searchByName(playerQuery: string): void {
    this.http
      .get<Player[]>('/users', {
        params: { query: playerQuery },
      })
      .subscribe((players) => {});
  }
}
