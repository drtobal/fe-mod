import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, CardApiResponse, GameDifficulty } from '../../types';
import { Observable } from 'rxjs';
import { API_CARDS, DEFAULT_CARDS, DEFAULT_DIFFICULT, GAME_DIFFICULTIES } from '../../constants';

/** this service is to interact with cards api and some other tasks over cards array */
@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  /** service constructor */
  constructor(
    private http: HttpClient,
  ) { /* do nothing */ }

  /** get cards from endpoint */
  getCards(difficulty: GameDifficulty = DEFAULT_DIFFICULT): Observable<CardApiResponse> {
    const params = new URLSearchParams();
    const difficultConfig = GAME_DIFFICULTIES.find(d => d.key === difficulty);
    params.set('per_page', difficultConfig?.cards.toString() || DEFAULT_CARDS.toString());
    return this.http.get<CardApiResponse>(`${API_CARDS}?${params.toString()}`);
  }

  /** generate needed cards to play a game */
  generateCardsGame(cards: Card[]): Card[] {
    return this.suffle(this.duplicate(cards));
  }

  /** duplicate each item in the array */
  duplicate<T>(items: T[]): T[] {
    // be careful, this generates duplicates uuid
    return items.reduce((res: T[], current: T) => res.concat([current, current]), []);
  }

  /** suffle the array - modern version of the Fisher–Yates shuffle*/
  suffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

}
