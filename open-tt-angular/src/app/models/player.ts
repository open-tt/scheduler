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
