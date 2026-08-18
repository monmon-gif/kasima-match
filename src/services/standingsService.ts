import standingsJson from '@/data/standings/2026-j1.json';
import type { StandingRow, StandingsData } from '@/types/standings';

const standings = standingsJson as StandingsData;

const hasSameRank = (first: StandingRow, second: StandingRow) =>
  first.points === second.points &&
  first.goalDifference === second.goalDifference &&
  first.goalsFor === second.goalsFor;

export const getStandings = () => {
  const sortedRows = standings.teams
    .map((team) => ({
      ...team,
      rank: 0,
      played: team.wins + team.draws + team.losses,
      goalDifference: team.goalsFor - team.goalsAgainst,
      points: team.wins * 3 + team.draws,
    }))
    .sort(
      (first, second) =>
        second.points - first.points ||
        second.goalDifference - first.goalDifference ||
        second.goalsFor - first.goalsFor,
    );

  const rows = sortedRows.map((row) => ({
    ...row,
    rank: sortedRows.findIndex((candidate) => hasSameRank(row, candidate)) + 1,
  }));

  return { ...standings, teams: rows };
};
