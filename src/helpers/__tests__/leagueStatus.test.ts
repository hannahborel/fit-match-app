import { League, LeagueToUser } from 'hustle-types';
import {
  isLeagueFull,
  hasLeagueStarted,
  getMembersNeeded,
  shouldShowSchedule,
} from '../leagueStatus';

// Helper to create mock league users
const createMockLeagueUser = (
  userId: string,
  index: number
): LeagueToUser => ({
  id: index.toString(),
  leagueId: '1',
  userId,
  firstName: `User${index}`,
  lastName: `Last${index}`,
  isBot: false,
  wins: 0,
  losses: 0,
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

describe('leagueStatus', () => {
  describe('isLeagueFull', () => {
    it('should return true when league has reached capacity', () => {
      const league = createMockLeague({
        size: 4,
        leaguesToUsers: [
          createMockLeagueUser('user1', 1),
          createMockLeagueUser('user2', 2),
          createMockLeagueUser('user3', 3),
          createMockLeagueUser('user4', 4),
        ],
      });
      expect(isLeagueFull(league)).toBe(true);
    });

    it('should return false when league has not reached capacity', () => {
      const league = createMockLeague({
        size: 4,
        leaguesToUsers: [
          createMockLeagueUser('user1', 1),
          createMockLeagueUser('user2', 2),
        ],
      });
      expect(isLeagueFull(league)).toBe(false);
    });
  });

  describe('hasLeagueStarted', () => {
    it('should return true when current date is after start date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const league = createMockLeague({
        startDate: pastDate.toISOString(),
      });
      expect(hasLeagueStarted(league)).toBe(true);
    });

    it('should return false when current date is before start date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const league = createMockLeague({
        startDate: futureDate.toISOString(),
      });
      expect(hasLeagueStarted(league)).toBe(false);
    });
  });

  describe('getMembersNeeded', () => {
    it('should return correct number of members needed', () => {
      const league = createMockLeague({
        size: 4,
        leaguesToUsers: [
          createMockLeagueUser('user1', 1),
          createMockLeagueUser('user2', 2),
        ],
      });
      expect(getMembersNeeded(league)).toBe(2);
    });

    it('should return 0 when league is full', () => {
      const league = createMockLeague({
        size: 2,
        leaguesToUsers: [
          createMockLeagueUser('user1', 1),
          createMockLeagueUser('user2', 2),
        ],
      });
      expect(getMembersNeeded(league)).toBe(0);
    });
  });

  describe('shouldShowSchedule', () => {
    it('should return true when league is full', () => {
      const league = createMockLeague({
        size: 2,
        leaguesToUsers: [
          createMockLeagueUser('user1', 1),
          createMockLeagueUser('user2', 2),
        ],
        startDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      });
      expect(shouldShowSchedule(league)).toBe(true);
    });

    it('should return false when league has started but not full', () => {
      const league = createMockLeague({
        size: 4,
        leaguesToUsers: [createMockLeagueUser('user1', 1)],
        startDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      });
      // Schedule only shows when league is full, not just started
      expect(shouldShowSchedule(league)).toBe(false);
    });

    it('should return true when league is exactly full', () => {
      const league = createMockLeague({
        size: 4,
        leaguesToUsers: [
          createMockLeagueUser('user1', 1),
          createMockLeagueUser('user2', 2),
          createMockLeagueUser('user3', 3),
          createMockLeagueUser('user4', 4),
        ],
        startDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      });
      expect(shouldShowSchedule(league)).toBe(true);
    });

    it('should return false when league is not full and has not started', () => {
      const league = createMockLeague({
        size: 4,
        leaguesToUsers: [createMockLeagueUser('user1', 1)],
        startDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      });
      expect(shouldShowSchedule(league)).toBe(false);
    });
  });
});
