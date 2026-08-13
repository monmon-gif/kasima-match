import type { Match } from '@/types/match';
import type { PlayerStats } from '@/types/playerStats';

/**
 * 終了済みの試合から、指定された選手のシーズン成績を集計する。
 * 先発と途中出場が同一試合で重複して数えられないようにしている。
 */
export const calculatePlayerStats = (
  matches: Match[],
  playerId: string,
): PlayerStats => {
  const finishedMatches = matches.filter(
    (match) => match.status === 'FINISHED',
  );

  let appearances = 0;
  let starts = 0;
  let substituteAppearances = 0;
  let minutes = 0;

  for (const match of finishedMatches) {
    const started = match.startingPlayers.some(
      (player) => player.playerId === playerId,
    );
    const entered = match.substitutions.find(
      (substitution) => substitution.playerInId === playerId,
    );
    const leftPitch = match.substitutions.find(
      (substitution) => substitution.playerOutId === playerId,
    );

    if (started || entered) {
      appearances += 1;
    }

    if (started) {
      starts += 1;
      minutes += leftPitch?.minute ?? match.matchDuration;
    } else if (entered) {
      substituteAppearances += 1;
      minutes += match.matchDuration - entered.minute;
    }
  }

  const allGoals = finishedMatches.flatMap((match) => match.goals);
  const allCards = finishedMatches.flatMap((match) => match.cards);

  return {
    playerId,
    appearances,
    starts,
    substituteAppearances,
    minutes,
    goals: allGoals.filter(
      (goal) =>
        goal.team === 'KASHIMA' &&
        goal.scorerPlayerId === playerId &&
        goal.goalType !== 'OWN_GOAL',
    ).length,
    assists: allGoals.filter((goal) => goal.assistPlayerId === playerId).length,
    yellowCards: allCards.filter(
      (card) =>
        card.playerId === playerId &&
        (card.type === 'YELLOW' || card.type === 'SECOND_YELLOW'),
    ).length,
    redCards: allCards.filter(
      (card) =>
        card.playerId === playerId &&
        (card.type === 'RED' || card.type === 'SECOND_YELLOW'),
    ).length,
  };
};
