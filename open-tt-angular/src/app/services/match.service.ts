import { Injectable } from '@angular/core';
import { Match } from '../models/tournament';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TournamentService } from './tournament.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private http: HttpClient) {}

  updateMatchResult(updatedMatch: Match): Observable<Match> {
    const url = environment.tournament_api_url + `/match/${updatedMatch.id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      sets: updatedMatch.match_sets,
    };
    const httpOptions = {
      headers,
    };
    return this.http.put<Match>(url, body, httpOptions);
  }
}
