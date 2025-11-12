import {
  calculatePointsForUser,
  transformLeagueToSchedule,
} from '../matchesHelper';
import { League, LoggedActivity } from 'hustle-types';

describe('matchesHelper', () => {
  describe('calculatePointsForUser', () => {
    it('should calculate total points for a user with multiple activities', () => {
      const userId = 'user-1';
      const loggedActivities: LoggedActivity[] = [
        {
          id: '1',
          userId: 'user-1',
          cardioPoints: 10,
          strengthPoints: 5,
          activityType: 'running',
          duration: 30,
          createdAt: new Date(),
        } as LoggedActivity,
        {
          id: '2',
          userId: 'user-1',
          cardioPoints: 15,
          strengthPoints: 10,
          activityType: 'cycling',
          duration: 45,
          createdAt: new Date(),
        } as LoggedActivity,
      ];

      const result = calculatePointsForUser(userId, loggedActivities);
      expect(result).toBe(40); // 10 + 5 + 15 + 10
    });

    it('should return 0 for user with no activities', () => {
      const userId = 'user-1';
      const loggedActivities: LoggedActivity[] = [];

      const result = calculatePointsForUser(userId, loggedActivities);
      expect(result).toBe(0);
    });

    it('should only count activities for the specified user', () => {
      const userId = 'user-1';
      const loggedActivities: LoggedActivity[] = [
        {
          id: '1',
          userId: 'user-1',
          cardioPoints: 10,
          strengthPoints: 5,
          activityType: 'running',
          duration: 30,
          createdAt: new Date(),
        } as LoggedActivity,
        {
          id: '2',
          userId: 'user-2',
          cardioPoints: 100,
          strengthPoints: 100,
          activityType: 'cycling',
          duration: 45,
          createdAt: new Date(),
        } as LoggedActivity,
      ];

      const result = calculatePointsForUser(userId, loggedActivities);
      expect(result).toBe(15); // Only user-1's activities
    });

    it('should handle null cardio and strength points', () => {
      const userId = 'user-1';
      const loggedActivities: LoggedActivity[] = [
        {
          id: '1',
          userId: 'user-1',
          cardioPoints: null,
          strengthPoints: null,
          activityType: 'running',
          duration: 30,
          createdAt: new Date(),
        } as LoggedActivity,
      ];

      const result = calculatePointsForUser(userId, loggedActivities);
      expect(result).toBe(0);
    });
  });

  describe('transformLeagueToSchedule', () => {
    it('should group players by team index within the same match', () => {
      const mockLeague: League = {
        id: 'league-1',
        name: 'Test League',
        size: 4,
        weeks: 1,
        leaguesToUsers: [
          { userId: 'user-1', id: 'lu-1', firstName: 'User 1' },
          { userId: 'user-2', id: 'lu-2', firstName: 'User 2' },
          { userId: 'user-3', id: 'lu-3', firstName: 'User 3' },
          { userId: 'user-4', id: 'lu-4', firstName: 'User 4' },
        ],
        matches: [
          {
            id: 'match-1',
            week: 1,
            matchesToUsers: [
              { userId: 'user-1', teamIndex: 0 },
              { userId: 'user-2', teamIndex: 0 },
              { userId: 'user-3', teamIndex: 1 },
              { userId: 'user-4', teamIndex: 1 },
            ],
          },
        ],
        loggedActivities: [],
      } as any;

      const result = transformLeagueToSchedule(mockLeague);

      expect(result.leagueSchedule).toHaveLength(1);
      expect(result.leagueSchedule[0].week).toBe(1);
      expect(result.leagueSchedule[0].matchups).toHaveLength(1);

      const matchup = result.leagueSchedule[0].matchups[0];
      expect(matchup).toHaveLength(2); // Two teams

      // Team 0 should have user-1 and user-2
      const team0 = matchup.find((team) => team.teamIndex === 0);
      expect(team0).toBeDefined();
      expect(team0!.players).toHaveLength(2);
      expect(team0!.players.map((p) => p.userId)).toContain('user-1');
      expect(team0!.players.map((p) => p.userId)).toContain('user-2');

      // Team 1 should have user-3 and user-4
      const team1 = matchup.find((team) => team.teamIndex === 1);
      expect(team1).toBeDefined();
      expect(team1!.players).toHaveLength(2);
      expect(team1!.players.map((p) => p.userId)).toContain('user-3');
      expect(team1!.players.map((p) => p.userId)).toContain('user-4');
    });

    it('should calculate total points for each team', () => {
      const mockLeague: League = {
        id: 'league-1',
        name: 'Test League',
        size: 4,
        weeks: 1,
        leaguesToUsers: [
          { userId: 'user-1', id: 'lu-1', firstName: 'User 1' },
          { userId: 'user-2', id: 'lu-2', firstName: 'User 2' },
          { userId: 'user-3', id: 'lu-3', firstName: 'User 3' },
          { userId: 'user-4', id: 'lu-4', firstName: 'User 4' },
        ],
        matches: [
          {
            id: 'match-1',
            week: 1,
            matchesToUsers: [
              { userId: 'user-1', teamIndex: 0 },
              { userId: 'user-2', teamIndex: 0 },
              { userId: 'user-3', teamIndex: 1 },
              { userId: 'user-4', teamIndex: 1 },
            ],
          },
        ],
        loggedActivities: [
          {
            id: '1',
            userId: 'user-1',
            cardioPoints: 10,
            strengthPoints: 5,
            activityType: 'running',
            duration: 30,
            createdAt: new Date(),
          },
          {
            id: '2',
            userId: 'user-2',
            cardioPoints: 20,
            strengthPoints: 10,
            activityType: 'cycling',
            duration: 45,
            createdAt: new Date(),
          },
          {
            id: '3',
            userId: 'user-3',
            cardioPoints: 5,
            strengthPoints: 5,
            activityType: 'running',
            duration: 20,
            createdAt: new Date(),
          },
        ] as LoggedActivity[],
      } as any;

      const result = transformLeagueToSchedule(mockLeague);

      const matchup = result.leagueSchedule[0].matchups[0];
      const team0 = matchup.find((team) => team.teamIndex === 0);
      const team1 = matchup.find((team) => team.teamIndex === 1);

      // Team 0: user-1 (15) + user-2 (30) = 45
      expect(team0!.totalPoints).toBe(45);

      // Team 1: user-3 (10) + user-4 (0) = 10
      expect(team1!.totalPoints).toBe(10);
    });

    it('should handle multiple matches in the same week', () => {
      const mockLeague: League = {
        id: 'league-1',
        name: 'Test League',
        size: 8,
        weeks: 1,
        leaguesToUsers: [
          { userId: 'user-1', id: 'lu-1', firstName: 'User 1' },
          { userId: 'user-2', id: 'lu-2', firstName: 'User 2' },
          { userId: 'user-3', id: 'lu-3', firstName: 'User 3' },
          { userId: 'user-4', id: 'lu-4', firstName: 'User 4' },
          { userId: 'user-5', id: 'lu-5', firstName: 'User 5' },
          { userId: 'user-6', id: 'lu-6', firstName: 'User 6' },
          { userId: 'user-7', id: 'lu-7', firstName: 'User 7' },
          { userId: 'user-8', id: 'lu-8', firstName: 'User 8' },
        ],
        matches: [
          {
            id: 'match-1',
            week: 1,
            matchesToUsers: [
              { userId: 'user-1', teamIndex: 0 },
              { userId: 'user-2', teamIndex: 0 },
              { userId: 'user-3', teamIndex: 1 },
              { userId: 'user-4', teamIndex: 1 },
            ],
          },
          {
            id: 'match-2',
            week: 1,
            matchesToUsers: [
              { userId: 'user-5', teamIndex: 0 },
              { userId: 'user-6', teamIndex: 0 },
              { userId: 'user-7', teamIndex: 1 },
              { userId: 'user-8', teamIndex: 1 },
            ],
          },
        ],
        loggedActivities: [],
      } as any;

      const result = transformLeagueToSchedule(mockLeague);

      expect(result.leagueSchedule).toHaveLength(1);
      expect(result.leagueSchedule[0].matchups).toHaveLength(2); // Two separate matchups
    });

    it('should handle multiple weeks', () => {
      const mockLeague: League = {
        id: 'league-1',
        name: 'Test League',
        size: 4,
        weeks: 2,
        leaguesToUsers: [
          { userId: 'user-1', id: 'lu-1', firstName: 'User 1' },
          { userId: 'user-2', id: 'lu-2', firstName: 'User 2' },
          { userId: 'user-3', id: 'lu-3', firstName: 'User 3' },
          { userId: 'user-4', id: 'lu-4', firstName: 'User 4' },
        ],
        matches: [
          {
            id: 'match-1',
            week: 1,
            matchesToUsers: [
              { userId: 'user-1', teamIndex: 0 },
              { userId: 'user-2', teamIndex: 1 },
            ],
          },
          {
            id: 'match-2',
            week: 2,
            matchesToUsers: [
              { userId: 'user-3', teamIndex: 0 },
              { userId: 'user-4', teamIndex: 1 },
            ],
          },
        ],
        loggedActivities: [],
      } as any;

      const result = transformLeagueToSchedule(mockLeague);

      expect(result.leagueSchedule).toHaveLength(2);
      expect(result.leagueSchedule[0].week).toBe(1);
      expect(result.leagueSchedule[1].week).toBe(2);
    });

    it('should sort teams by teamIndex within a matchup', () => {
      const mockLeague: League = {
        id: 'league-1',
        name: 'Test League',
        size: 4,
        weeks: 1,
        leaguesToUsers: [
          { userId: 'user-1', id: 'lu-1', firstName: 'User 1' },
          { userId: 'user-2', id: 'lu-2', firstName: 'User 2' },
        ],
        matches: [
          {
            id: 'match-1',
            week: 1,
            matchesToUsers: [
              { userId: 'user-2', teamIndex: 1 }, // Team 1 first
              { userId: 'user-1', teamIndex: 0 }, // Team 0 second
            ],
          },
        ],
        loggedActivities: [],
      } as any;

      const result = transformLeagueToSchedule(mockLeague);

      const matchup = result.leagueSchedule[0].matchups[0];
      expect(matchup[0].teamIndex).toBe(0); // Team 0 should be first
      expect(matchup[1].teamIndex).toBe(1); // Team 1 should be second
    });

    it('should handle bot users', () => {
      const mockLeague: League = {
        id: 'league-1',
        name: 'Test League',
        size: 4,
        weeks: 1,
        leaguesToUsers: [
          { userId: 'user-1', id: 'lu-1', firstName: 'User 1' },
          { userId: 'bot-2', id: 'lu-2', firstName: 'Bot User' },
        ],
        matches: [
          {
            id: 'match-1',
            week: 1,
            matchesToUsers: [
              { userId: 'user-1', teamIndex: 0 },
              { userId: 'bot-2', teamIndex: 1 },
            ],
          },
        ],
        loggedActivities: [],
      } as any;

      const result = transformLeagueToSchedule(mockLeague);

      const matchup = result.leagueSchedule[0].matchups[0];
      const botTeam = matchup.find((team) => team.teamIndex === 1);
      const botPlayer = botTeam!.players[0];

      expect(botPlayer.name).toBe('Bot');
    });
  });
});
