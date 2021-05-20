import { Time } from '@angular/common';

export interface Reservation {
  id?: number;
  host: string;
  host_rsvp?: RSVP;
  host_profile_image?: string;
  host_rating?: number;
  recipient: string;
  recipient_rsvp?: RSVP;
  recipient_profile_image?: string;
  recipient_rating?: number;
  kind: ReservationType;
  event_date: string;
  start_time: string;
  end_time: string;
  note?: string;
  duration_in_minutes?: number;
}

export enum ReservationType {
  Lesson = 'lesson',
  Play = 'play',
  Train = 'train',
}

export enum RSVP {
  YES = 'yes',
  NO = 'no',
  MAYBE = 'maybe',
}
