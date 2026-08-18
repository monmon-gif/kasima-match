import { matches } from '@/data/matches';

/** 全試合を開催日の古い順で返す。 */
export const getMatches = () =>
  [...matches].sort((first, second) => first.date.localeCompare(second.date));

/** URLで指定されたIDに一致する試合を取得する。 */
export const getMatchById = (matchId: string) =>
  matches.find((match) => match.matchId === matchId);

export const getMatchesBySeason = (season: number) =>
  getMatches().filter((match) => match.season === season);

/** 終了済み試合のうち、開催日が最も新しい1試合を返す。 */
export const getLatestMatch = (season: number) =>
  getMatchesBySeason(season)
    .filter((match) => match.status === 'FINISHED')
    .at(-1);

/** 開催日順で最初に見つかった開催予定試合を返す。 */
export const getNextMatch = (season: number) =>
  getMatchesBySeason(season).find(
    (match) => match.status === 'SCHEDULED',
  );
