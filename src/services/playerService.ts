import playersData from '@/data/players.json';
import type { Player, PlayerPosition } from '@/types/player';

const players = playersData as Player[];

const positionOrder: Record<PlayerPosition, number> = {
  GK: 0,
  DF: 1,
  MF: 2,
  FW: 3,
};

export const getPlayers = () => [...players];

/** 在籍選手をポジション順、同一ポジションでは背番号順に並べる。 */
export const getActivePlayers = () =>
  players
    .filter((player) => player.active)
    .sort(
      (first, second) =>
        positionOrder[first.position] - positionOrder[second.position] ||
        first.number - second.number,
    );

export const getPlayerById = (playerId: string) =>
  players.find((player) => player.playerId === playerId);

/** 試合データ内の選手IDを画面表示用の名前へ変換する。 */
export const getPlayerName = (playerId: string | null) => {
  if (!playerId) {
    return '対戦相手';
  }

  return getPlayerById(playerId)?.name ?? '不明な選手';
};
