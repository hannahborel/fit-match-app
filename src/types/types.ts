export type League = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  size: number;
  weeks: number;
  startDate: string; // ISO string, e.g. "2025-06-30T00:00:00.000Z"
  slug: string;
  createdAt: string;
  updatedAt: string;
};
export type CreateLeagueInput = {
  name: string;
  description: string;
  ownerId: string;
  size: number;
  weeks: number;
  startDate: string; // ISO string, e.g. "2025-06-30T00:00:00.000Z"
  slug?: string;
  createdAt: string;
  updatedAt: string;
};
