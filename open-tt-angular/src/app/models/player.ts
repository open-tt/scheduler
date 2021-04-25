// tslint:disable
export interface Player {
  // Account
  id: number;
  name: string;
  profile_img?: string;
  email?: string;
  phone?: string;
  address?: string;
  tt_profile?: {
    tournamentrating: number;
    // email or phone number
    // Optional, when empty, users cannot log in, only view data
    leaguerating?: number;
    homeclub?: string;
    userID?: string;
    USATTID?: string;
    handicap?: number;
    // reservations: Reservation[];
    // memberships: Membership[];

    home_club?: string;

    blade?: string;
    forehand?: string;
    backhand?: string;
    grip?: string;
    hand?: string;
    play_style?: string;
    partner_min_rating?: number;
    partner_max_rating?: number;
  };
}

interface Membership {
  start: Date;
  end: Date;
  cost: string;
}

// tslint:enable
