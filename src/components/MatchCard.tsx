import Link from 'next/link';

import type { Match } from '@/types/match';
import { formatMatchDate } from '@/utils/formatDate';

const resultLabels = {
  WIN: '勝利',
  DRAW: '引分',
  LOSE: '敗戦',
} as const;

type MatchCardProps = {
  match: Match;
};

export function MatchCard({ match }: MatchCardProps) {
  const isKashimaHome = match.homeAway === 'HOME';
  const homeScore = isKashimaHome
    ? match.score?.kashima
    : match.score?.opponent;
  const awayScore = isKashimaHome
    ? match.score?.opponent
    : match.score?.kashima;

  return (
    <Link className="match-card" href={`/matches/${match.matchId}`}>
      <div className="card-top">
        <span>
          {match.competition} · {match.round}
        </span>
        <span
          className={`badge ${match.result?.toLowerCase() ?? 'scheduled'}`}
        >
          {match.result ? resultLabels[match.result] : '開催予定'}
        </span>
      </div>

      <p className="date">
        {formatMatchDate(match.date, match.dateCandidates)}　
        {match.kickoffTime || '時刻未定'}
      </p>

      <div className="scoreline">
        <span>
          {isKashimaHome ? '鹿島アントラーズ' : match.opponent.name}
        </span>
        <strong>
          {match.score ? `${homeScore} － ${awayScore}` : 'VS'}
        </strong>
        <span>
          {isKashimaHome ? match.opponent.name : '鹿島アントラーズ'}
        </span>
      </div>

      <p className="venue">
        {match.homeAway} · {match.venue}
      </p>
    </Link>
  );
}
