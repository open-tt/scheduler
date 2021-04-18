// tslint:disable
export interface Player {
  id: number;
  name: string;
  tournamentrating: number;
  // email or phone number
  // Optional, when empty, users cannot log in, only view data
  leaguerating?: number;
  userID?: string;
  USATTID?: string;
  handicap?: number;
  // reservations: Reservation[];
  // memberships: Membership[];

  email?: string;
  phone?: string;
  address?: string;
  home_club?: string;
  gender?: string;
  age?: string;
  racket_blade?: string;
  forehand_rubber?: string;
  backhand_rubber?: string;
  grip?: string;
  hand?: string;
  play_style?: string;
  partner_min_rating?: number;
  partner_max_rating?: number;
  profile_img?: string;
}

interface Membership {
  start: Date;
  end: Date;
  cost: string;
}

export interface Reservation {
  id: number;
  coach_id: number;
  user_id: number;
  kind: ReservationType;
  duration_in_minutes: number;
  start_timestamp: number;
  location_id: number;
  size: number;
  created_at: Date;
  updated_at: Date;
}

enum ReservationType {
  Lesson,
  OpenPlay,
}
// tslint:enable
