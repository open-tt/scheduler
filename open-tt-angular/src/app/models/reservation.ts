import { Time } from '@angular/common';

export interface Reservation {
  id?: number;
  host: string;
  recipient: string;
  recipient_rsvp?: RSVP;
  kind: ReservationType;
  event_date: string;
  start_time: string;
  end_time: string;
  note?: string;
  duration_in_minutes?: number;
}

export enum ReservationType {
  Lesson,
  Play,
  Train,
}

export enum RSVP {
  YES,
  NO,
  MAYBE,
}
