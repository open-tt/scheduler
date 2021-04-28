// tslint:disable-next-line:no-namespace

// tslint:disable-next-line:no-namespace
import { Reservation } from '../models/reservation';

export namespace ReservationApi {
  export class Paths {
    // private static BASE_URL = 'http://35.239.173.45:3002';
    private static BASE_URL = 'http://0.0.0.0:3001';
    private static RESERVATIONS = '/reservations';

    static createReservation(): string {
      return Paths.BASE_URL + Paths.RESERVATIONS;
    }
    static getManyReservations(): string {
      return Paths.BASE_URL + Paths.RESERVATIONS;
    }
    static getOneReservation(id: string): string {
      return Paths.BASE_URL + Paths.RESERVATIONS + `/${id}`;
    }
    static updateReservation(id: string): string {
      return Paths.BASE_URL + Paths.RESERVATIONS + `/${id}`;
    }
    static deleteReservation(id: string): string {
      return Paths.BASE_URL + Paths.RESERVATIONS + `/${id}`;
    }
  }

  export class ReservationResponse {
    reservations: Reservation[];
  }
}
