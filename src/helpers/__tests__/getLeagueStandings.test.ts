import { League, LeagueToUser, LoggedActivity } from 'hustle-types';
import { getLeagueStandings, StandingEntry } from '../getLeagueStandings';

// Helper to create mock league users
const createMockLeagueUser = (
  userId: string,
  firstName: string,
  index: number
): LeagueToUser => ({
  id: index.toString(),
  leagueId: '1',
  userId,
  firstName,
  lastName: `Last${index}`,
  isBot: false,
  wins: 0,
  losses: 0,
});

// Helper to create mock logged activity
const createMockActivity = (
  userId: string,
  activityType: 'cardio' | 'strength',
  points: number
): LoggedActivity => ({
  id: `activity-${userId}-${Math.random()}`,
  userId,
  leagueId: '1',
  matchId: 'match1',
  activityType,
  cardioPoints: activityType === 'cardio' ? points : 0,
  strengthPoints: activityType === 'strength' ? points : 0,
  points,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// Mock league data for testing
const createMockLeague = (overrides: Partial<League> = {}): League => ({
  id: '1',
  name: 'Test League',
  description: 'Test Description',
  ownerId: 'owner1',
  size: 4,
  weeks: 8,
  startDate: '2024-12-31T00:00:00.000Z',
  slug: 'test-league',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  leaguesToUsers: [],
  loggedActivities: [],
  matches: [],
  ...overrides,
});

describe('getLeagueStandings', () => {
  describe('placeholder generation', () => {
    it('should generate placeholders for empty slots', () => {
      const league = createMockLeague({
        size: 4,
        leaguesToUsers: [createMockLeagueUser('user1', 'John', 1)],
      });

      const standings = getLeagueStandings(league);

      expect(standings).toHaveLength(4);
      expect(standings[0].userId).toBe('user1');
      expect(standings[0].firstName).toBe('John');
      expect(standings[0].isPlaceholder).toBe(false);

      // Check placeholders
      expect(standings[1].userId).toBe('placeholder-2');
      expect(standings[1].firstName).toBe('Player 2');
      expect(standings[1].isPlaceholder).toBe(true);
      expect(standings[1].totalPoints).toBe(0);

      expect(standings[2].userId).toBe('placeholder-3');
      expect(standings[2].firstName).toBe('Player 3');
      expect(standings[2].isPlaceholder).toBe(true);

      expect(standings[3].userId).toBe('placeholder-4');
      expect(standings[3].firstName).toBe('Player 4');
      expect(standings[3].isPlaceholder).toBe(true);
    });

    it('should not generate placeholders when league is full', () => {
      const league = createMockLeague({
        size: 2,
        leaguesToUsers: [
          createMockLeagueUser('user1', 'John', 1),
          createMockLeagueUser('user2', 'Jane', 2),
        ],
      });

      const standings = getLeagueStandings(league);

      expect(standings).toHaveLength(2);
      expect(standings.every((s) => !s.isPlaceholder)).toBe(true);
    });

    it('should generate correct number of placeholders', () => {
      const league = createMockLeague({
        size: 8,
        leaguesToUsers: [
          createMockLeagueUser('user1', 'User1', 1),
          createMockLeagueUser('user2', 'User2', 2),
          createMockLeagueUser('user3', 'User3', 3),
        ],
      });

      const standings = getLeagueStandings(league);

      expect(standings).toHaveLength(8);
      const realUsers = standings.filter((s) => !s.isPlaceholder);
      const placeholders = standings.filter((s) => s.isPlaceholder);
      expect(realUsers).toHaveLength(3);
      expect(placeholders).toHaveLength(5);
    });
  });

  describe('points calculation', () => {
    it('should calculate total points correctly', () => {
      const league = createMockLeague({
        size: 2,
        leaguesToUsers: [createMockLeagueUser('user1', 'John', 1)],
        loggedActivities: [
          createMockActivity('user1', 'cardio', 50),
          createMockActivity('user1', 'strength', 30),
          createMockActivity('user1', 'cardio', 20),
        ],
      });

      const standings = getLeagueStandings(league);

      expect(standings[0].cardioPoints).toBe(70);
      expect(standings[0].strengthPoints).toBe(30);
      expect(standings[0].totalPoints).toBe(100);
    });

    it('should separate cardio and strength points', () => {
      const league = createMockLeague({
        size: 2,
        leaguesToUsers: [createMockLeagueUser('user1', 'John', 1)],
        loggedActivities: [
          createMockActivity('user1', 'cardio', 50),
          createMockActivity('user1', 'strength', 75),
        ],
      });

      const standings = getLeagueStandings(league);

      expect(standings[0].cardioPoints).toBe(50);
      expect(standings[0].strengthPoints).toBe(75);
      expect(standings[0].totalPoints).toBe(125);
    });

    it('should handle users with no logged activities', () => {
      const league = createMockLeague({
        size: 2,
        leaguesToUsers: [
          createMockLeagueUser('user1', 'John', 1),
          createMockLeagueUser('user2', 'Jane', 2),
        ],
        loggedActivities: [],
      });

      const standings = getLeagueStandings(league);

      expect(standings[0].totalPoints).toBe(0);
      expect(standings[0].cardioPoints).toBe(0);
      expect(standings[0].strengthPoints).toBe(0);
      expect(standings[1].totalPoints).toBe(0);
    });
  });

  describe('sorting behavior', () => {
    it('should sort by total points descending', () => {
      const league = createMockLeague({
        size: 3,
        leaguesToUsers: [
          createMockLeagueUser('user1', 'John', 1),
          createMockLeagueUser('user2', 'Jane', 2),
          createMockLeagueUser('user3', 'Bob', 3),
        ],
        loggedActivities: [
          createMockActivity('user1', 'cardio', 50),
          createMockActivity('user2', 'cardio', 100),
          createMockActivity('user3', 'cardio', 75),
        ],
      });

      const standings = getLeagueStandings(league);

      expect(standings[0].userId).toBe('user2');
      expect(standings[0].totalPoints).toBe(100);
      expect(standings[1].userId).toBe('user3');
      expect(standings[1].totalPoints).toBe(75);
      expect(standings[2].userId).toBe('user1');
      expect(standings[2].totalPoints).toBe(50);
    });

    it('should place placeholders at bottom when users have points', () => {
      const league = createMockLeague({
        size: 4,
        leaguesToUsers: [
          createMockLeagueUser('user1', 'John', 1),
          createMockLeagueUser('user2', 'Jane', 2),
        ],
        loggedActivities: [
          createMockActivity('user1', 'cardio', 50),
          createMockActivity('user2', 'cardio', 30),
        ],
      });

      const standings = getLeagueStandings(league);

      expect(standings[0].userId).toBe('user1');
      expect(standings[0].totalPoints).toBe(50);
      expect(standings[1].userId).toBe('user2');
      expect(standings[1].totalPoints).toBe(30);
      expect(standings[2].isPlaceholder).toBe(true);
      expect(standings[2].totalPoints).toBe(0);
      expect(standings[3].isPlaceholder).toBe(true);
      expect(standings[3].totalPoints).toBe(0);
    });

    it('should maintain consistent ordering for tied scores', () => {
      const league = createMockLeague({
        size: 3,
        leaguesToUsers: [
          createMockLeagueUser('user1', 'John', 1),
          createMockLeagueUser('user2', 'Jane', 2),
          createMockLeagueUser('user3', 'Bob', 3),
        ],
        loggedActivities: [
          createMockActivity('user1', 'cardio', 50),
          createMockActivity('user2', 'cardio', 50),
          createMockActivity('user3', 'cardio', 50),
        ],
      });

      const standings = getLeagueStandings(league);

      // All should have 50 points
      expect(standings[0].totalPoints).toBe(50);
      expect(standings[1].totalPoints).toBe(50);
      expect(standings[2].totalPoints).toBe(50);
    });
  });

  describe('edge cases', () => {
    it('should handle league with only creator', () => {
      const league = createMockLeague({
        size: 4,
        leaguesToUsers: [createMockLeagueUser('user1', 'John', 1)],
        loggedActivities: [],
      });

      const standings = getLeagueStandings(league);

      expect(standings).toHaveLength(4);
      expect(standings[0].userId).toBe('user1');
      expect(standings.filter((s) => s.isPlaceholder)).toHaveLength(3);
    });

    it('should handle empty league (no users)', () => {
      const league = createMockLeague({
        size: 4,
        leaguesToUsers: [],
        loggedActivities: [],
      });

      const standings = getLeagueStandings(league);

      expect(standings).toHaveLength(4);
      expect(standings.every((s) => s.isPlaceholder)).toBe(true);
      expect(standings[0].firstName).toBe('Player 1');
      expect(standings[3].firstName).toBe('Player 4');
    });

    it('should handle large league sizes', () => {
      const league = createMockLeague({
        size: 20,
        leaguesToUsers: [
          createMockLeagueUser('user1', 'John', 1),
          createMockLeagueUser('user2', 'Jane', 2),
        ],
      });

      const standings = getLeagueStandings(league);

      expect(standings).toHaveLength(20);
      expect(standings.filter((s) => !s.isPlaceholder)).toHaveLength(2);
      expect(standings.filter((s) => s.isPlaceholder)).toHaveLength(18);
    });

    it('should handle bots correctly', () => {
      const botUser: LeagueToUser = {
        id: '3',
        leagueId: '1',
        userId: 'bot-1',
        firstName: 'Flex',
        lastName: 'Fury',
        isBot: true,
        wins: 0,
        losses: 0,
      };

      const league = createMockLeague({
        size: 3,
        leaguesToUsers: [
          createMockLeagueUser('user1', 'John', 1),
          createMockLeagueUser('user2', 'Jane', 2),
          botUser,
        ],
        loggedActivities: [
          createMockActivity('user1', 'cardio', 50),
          createMockActivity('bot-1', 'cardio', 40),
        ],
      });

      const standings = getLeagueStandings(league);

      expect(standings).toHaveLength(3);
      const botStanding = standings.find((s) => s.userId === 'bot-1');
      expect(botStanding).toBeDefined();
      expect(botStanding!.isBot).toBe(true);
      expect(botStanding!.isPlaceholder).toBe(false);
      expect(botStanding!.totalPoints).toBe(40);
    });
  });
});
