export type StandingTeamData = {
  teamId: string;
  name: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
};

export type StandingsData = {
  season: number;
  competition: string;
  updatedAt: string;
  teams: StandingTeamData[];
};

export type StandingRow = StandingTeamData & {
  rank: number;
  played: number;
  goalDifference: number;
  points: number;
};
