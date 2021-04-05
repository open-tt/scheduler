import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import { Observable, Subject } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playerUniverse: Player[];
  playerUniverseSubject: Subject<Player[]>;

  constructor(private http2: HttpClient, private http: BaseApiService) {
    this.playerUniverseSubject = new Subject<Player[]>();
    this.playerUniverse = [];
  }

  // Getters and Setters
  genPlayerUniverse(): Observable<Player[]> {
    return this.playerUniverseSubject.asObservable();
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
      this.playerUniverseSubject.next(this.playerUniverse);
    });
  }

  playerName(id: number): string {
    const player = this.playerUniverse.find((p) => p.id === id);
    return player ? player.name : '';
  }
}
