# Product Context

This file provides a high-level overview of the fitness app project, including goals, voice, and key features. It serves as a foundation for all future work, especially feature development and storytelling.

---

## Project Goal

A fitness app that uses fantasy sports mechanics to make health, exercise, and friendly competition fun and engaging. Users compete in leagues (solo, 1v1, or team-based) to log workouts, earn points, and track progress.

---

## Brand Voice & Messaging

Playful, sarcastic, and encouraging—like your funniest coach from high school. Users should feel challenged and supported, with language that's direct, lighthearted, and a little tough-love. Think ESPN fantasy meets group chat trash talk.

---

## Key Features

### Authentication & Onboarding

- Email login/signup via Clerk.
- Users join or create a league:
  - **Face Off**: team-based fantasy-style league
  - **Duel**: head-to-head challenge
  - **Steps**: step count battle
- Invite friends via SMS/email.

### League Setup

- Name the league, set start date, configure regular/playoff weeks.
- Auto-add bot if league has an odd number of users.

### Home Dashboard

- Countdown to league start.
- (Future) Add progress summaries and motivational stats.

### Standings

- League leaderboard with total points and per-activity breakdowns.
- Weekly matchups shown for _Face Off_ leagues.

### Log Activity

- Select activity type and enter relevant data (e.g., sets, reps, duration).
- Optionally upload photo or note.
- Activities scored via algorithm and posted to leaderboard.

### Account Management

- View/edit user account.
- League creators can update league settings and manage members.

---

## Future Enhancements

- In-app trash talk (GIFs, emojis, quick messages).
- Visual dashboards with performance charts and stats.
- Gamification with badges, streaks, and milestone rewards.
