import type { HomeAway, Match } from '@/types/match';
import type { RecordStats, SeasonStats } from '@/types/seasonStats';

/** 終了済みの試合だけを対象に勝敗・得失点を集計する。 */
const calculateRecord = (
  matches: Match[],
  homeAway?: HomeAway,
): RecordStats => {
  const finishedMatches = matches.filter(
    (match) =>
      match.status === 'FINISHED' &&
      match.score !== null &&
      (!homeAway || match.homeAway === homeAway),
  );

  const wins = finishedMatches.filter((match) => match.result === 'WIN').length;
  const draws = finishedMatches.filter(
    (match) => match.result === 'DRAW',
  ).length;
  const losses = finishedMatches.filter(
    (match) => match.result === 'LOSE',
  ).length;
  const goalsFor = finishedMatches.reduce(
    (total, match) => total + (match.score?.kashima ?? 0),
    0,
  );
  const goalsAgainst = finishedMatches.reduce(
    (total, match) => total + (match.score?.opponent ?? 0),
    0,
  );

  return {
    matches: finishedMatches.length,
    wins,
    draws,
    losses,
    points: wins * 3 + draws,
    goalsFor,
    goalsAgainst,
    goalDifference: goalsFor - goalsAgainst,
  };
};

export const calculateSeasonStats = (
  matches: Match[],
  season: number,
): SeasonStats => {
  const seasonMatches = matches.filter((match) => match.season === season);

  return {
    season,
    ...calculateRecord(seasonMatches),
    home: calculateRecord(seasonMatches, 'HOME'),
    away: calculateRecord(seasonMatches, 'AWAY'),
  };
};
