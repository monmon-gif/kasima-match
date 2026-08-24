import type { PlayerPosition } from './player';

export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED' | 'CANCELED';
export type MatchResult = 'WIN' | 'DRAW' | 'LOSE' | null;
export type HomeAway = 'HOME' | 'AWAY' | 'NEUTRAL';
export type MatchMinute = { minute: number; additionalTime: number | null };
export type Goal = MatchMinute & { team: 'KASHIMA' | 'OPPONENT'; scorerPlayerId: string | null; assistPlayerId: string | null; goalType: 'NORMAL' | 'PENALTY' | 'OWN_GOAL' | 'FREE_KICK' };
export type Card = MatchMinute & { team: 'KASHIMA' | 'OPPONENT'; playerId: string | null; type: 'YELLOW' | 'SECOND_YELLOW' | 'RED' };

export type Match = {
  matchId: string; season: number; competition: string; round: string; date: string;
  dateCandidates?: string[];
  kickoffTime: string; venue: string; homeAway: HomeAway;
  opponent: { opponentId: string; name: string }; status: MatchStatus; matchDuration: number;
  score: { kashima: number; opponent: number } | null; result: MatchResult; attendance: number | null;
  goals: Goal[]; startingPlayers: { playerId: string; position: PlayerPosition }[];
  substitutePlayers: { playerId: string; entered: boolean }[];
  substitutions: (MatchMinute & { playerOutId: string; playerInId: string })[]; cards: Card[];
};
