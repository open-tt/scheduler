import { Time } from '@angular/common';

export interface Reservation {
  id?: number;
  host: number;
  recipient: number;
  recipient_rsvp?: RSVP;
  kind: ReservationType;
  event_date: Date;
  start_time: Time;
  end_time: Time;
  created_at?: Date;
  note?: string;
  duration_in_minutes?: number;
}

export enum ReservationType {
  Lesson,
  Play,
  Train,
}

enum RSVP {
  YES,
  NO,
  MAYBE,
}
