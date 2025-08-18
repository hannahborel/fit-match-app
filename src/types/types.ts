export type CreateLeagueInput = {
  name: string;
  description: string;
  size: number;
  weeks: number;
  startDate: Date; // ISO string, e.g. "2025-06-30T00:00:00.000Z"
};
export type League = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  size: number;
  weeks: number;
  startDate: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  leaguesToUsers: LeagueUser[];
  loggedActivities: LoggedActivity[];
  matches: Match[];
};
export type CountdownTimerProps = {
  targetTime: string;
};

export type Table = {
  col1: string;
  col2: string | null | undefined;
}[];
export type LeagueUser = {
  id: string;
  leagueId: string;
  userId: string;
  isBot: boolean;
  wins: number;
  losses: number;
};

export type MatchToUser = {
  id: string;
  matchId: string;
  userId: string;
  teamIndex: number;
};

export type Match = {
  id: string;
  leagueId: string;
  week: number;
  createdAt: string;
  updatedAt: string;
  matchesToUsers: MatchToUser[];
};

export type LeagueResponse = {
  hasLeague: boolean;
  league: League;
};
export enum ActivityType {
  RUNNING = 'RUNNING',
  JOGGING = 'JOGGING',
  SPRINTS = 'SPRINTS',
  CIRCUT_TRAINING = 'CIRCUT_TRAINING',
  INTERVAL_TRAINING = 'INTERVAL_TRAINING',
  LONG_DISTANCE_RUNNING = 'LONG_DISTANCE_RUNNING',
  TENNIS = 'TENNIS',
  BASKETBALL = 'BASKETBALL',
  FOOTBALL = 'FOOTBALL',
  VOLLEYBALL = 'VOLLEYBALL',
  BADMINTON = 'BADMINTON',
  YOGA = 'YOGA',
  PILATES = 'PILATES',
  CYCLING = 'CYCLING',
  SWIMMING = 'SWIMMING',
  WEIGHT_TRAINING = 'WEIGHT_TRAINING',
  PICKLEBALL = 'PICKLEBALL',
  GOLF = 'GOLF',
  ROCK_CLIMBING = 'ROCK_CLIMBING',
  MARTIAL_ARTS = 'MARTIAL_ARTS',
  WALKING = 'WALKING',
  HIIT = 'HIIT',
  DANCE = 'DANCE',
  OTHER = 'OTHER',
}

export type MatchUser = {
  id: string;
  matchId: string;
  userId: string;
  teamIndex: 0 | 1;
};

export type LoggedActivity = {
  id: string;
  leagueId: string;
  matchId: string;
  userId: string;
  activityType: string;
  duration: number;
  sets: number;
  reps: number;
  cardioPoints: number;
  strengthPoints: number;
  photoUrl: string | null;
  activityNote: string | null;
  createdAt: string;
  updatedAt: string;
};
