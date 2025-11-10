# 📦 League DB Structure

This document outlines the schema and relationships for the **League** model in the FitMatch fantasy fitness app. This structure supports league-based competitions, matchups, and activity tracking.

## 🧱 League

A league is the main container for a fitness competition. It holds metadata about the group, participants, matches, and logged activities.

```ts
{
  id: string;
  name: string;
  description: string;
  ownerId: string; // Clerk user ID of league creator
  size: number; // Total participants
  weeks: number; // Duration of season in weeks
  startDate: Date;
  slug: string; // Used for league invite links
  createdAt: Date;
  updatedAt: Date;
  leaguesToUsers: LeagueUser[];
  loggedActivities: LoggedActivity[];
  matches: Match[];
  messages: Message[]; // [WIP]
}
```

## 👥 LeagueUser (leaguesToUsers)

Represents each user (or bot) participating in the league.

**⚠️ UPDATED SCHEMA** - Now includes user names for performance optimization

```ts
{
  id: string;
  leagueId: string;
  userId: string; // Clerk user ID or bot ID
  firstName: string; // Cached user first name (populated at join time)
  lastName: string | null; // Cached user last name (populated at join time)
  isBot: boolean;
  wins: number;
  losses: number;
}
```

**Design Rationale:**
- Names are "snapshotted" when users join the league for consistency
- Eliminates need for separate user lookups when displaying standings/schedules
- Prevents confusion if users update their profile names mid-season
- Single source of truth for league participant information
- Significantly improves performance by reducing database queries

## 🔁 Matches

Each match represents a weekly team-vs-team competition. Teams are formed dynamically from users and bots.

```ts
{
  id: string;
  leagueId: string;
  week: number;
  createdAt: Date;
  updatedAt: Date;
  matchesToUsers: MatchUser[];
}
```

### MatchUser (matchesToUsers)

```ts
{
  id: string;
  matchId: string;
  userId: string;
  teamIndex: 0 | 1; // Which side of the matchup the user is on
}
```

## 🏃 LoggedActivity

These are fitness activities logged by participants that contribute to their match performance.

```ts
{
  id: string;
  leagueId: string;
  matchId: string;
  userId: string;
  activityType: ActivityType;
  duration: number; // For DURATION-based activities
  sets: number;     // For SETSANDREPS-based activities
  reps: number;
  cardioPoints: number;
  strengthPoints: number;
  photoUrl: string;
  activityNote: string;
  createdAt: Date;
  updatedAt: Date;
}
```

Activity points are generated using multipliers depending on the activity type (see below).

## 🏷️ ActivityType

Here are the available activity types and how they are calculated:

```ts
export type ActivityType =
  | "RUNNING" | "WEIGHT_TRAINING" | "YOGA" | "BASKETBALL" | "CYCLING" | ...
```

Each activity is defined using:

```ts
{
  name: string;
  description: string;
  activityFormula: "DURATION" | "SETSANDREPS";
  cardioMultipilier: number;
  strengthMultipilier: number;
}
```

These multipliers are applied to duration or sets/reps to calculate points.

## 🛠️ Design Considerations

- Each league has exactly one `ownerId`, who can edit settings and invite others.
- Bots are injected automatically if an odd number of users join a Face Off league.
- Matchups rotate weekly and are stored with `teamIndex` mapping.
- Scores for leaderboard and standings are derived from `loggedActivities`.

## 📅 Data Flow Summary

1. **User joins/creates a league** → stored in `leaguesToUsers` with firstName/lastName captured from users/bots table
2. **Weekly matches generated** → stored in `matches`, tied to users via `matchesToUsers`
3. **User logs activities** → stored in `loggedActivities`, with point calculations
4. **Standings + match views** → directly use firstName/lastName from `leaguesToUsers` (no additional queries needed)

_This schema powers the social, competitive, and goal-driven aspects of the FitMatch app. Keep it tight, keep it sweaty, and always outscore your friends._ 💪
