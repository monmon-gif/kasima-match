import { notFound } from 'next/navigation';
import { getMatchById, getMatches } from '@/services/matchService';
import { getPlayerName } from '@/services/playerService';
import { formatMatchDate } from '@/utils/formatDate';
import { formatMatchMinute } from '@/utils/formatMatchMinute';

export function generateStaticParams() {
  return getMatches().map((match) => ({ matchId: match.matchId }));
}

type MatchDetailProps = {
  params: Promise<{ matchId: string }>;
};

export default async function MatchDetail({ params }: MatchDetailProps) {
  const { matchId } = await params;
  const match = getMatchById(matchId);

  if (!match) {
    notFound();
  }

  const isHome = match.homeAway === 'HOME';

  return (
    <>
      <div className="page-head centered">
        <p className="eyebrow">
          {match.competition} · {match.round}
        </p>
        <h1>{formatMatchDate(match.date, match.dateCandidates)}</h1>
        <p>
          {match.kickoffTime ? `${match.kickoffTime} KICK OFF` : '時刻未定'} ·{' '}
          {match.venue}
        </p>
      </div>

      <section className="scoreboard">
        <div>
          <small>{isHome ? 'HOME' : 'AWAY'}</small>
          <h2>{isHome ? '鹿島アントラーズ' : match.opponent.name}</h2>
        </div>

        <strong>
          {match.score
            ? `${isHome ? match.score.kashima : match.score.opponent} － ${
                isHome ? match.score.opponent : match.score.kashima
              }`
            : 'VS'}
        </strong>

        <div>
          <small>{isHome ? 'AWAY' : 'HOME'}</small>
          <h2>{isHome ? match.opponent.name : '鹿島アントラーズ'}</h2>
        </div>
      </section>

      {match.status === 'SCHEDULED' ? (
        <section className="empty">
          <h2>試合開始前です</h2>
          <p>メンバー・試合結果は決まり次第掲載します。</p>
        </section>
      ) : (
        <>
          <div className="two-col">
            <section className="panel">
              <h2>得点</h2>

              {match.goals.length ? (
                match.goals.map((goal, index) => (
                  <div className="event" key={index}>
                    <b>{formatMatchMinute(goal.minute, goal.additionalTime)}</b>
                    <span>
                      {goal.team === 'KASHIMA'
                        ? getPlayerName(goal.scorerPlayerId)
                        : match.opponent.name}
                      {goal.assistPlayerId && (
                        <small>
                          アシスト：{getPlayerName(goal.assistPlayerId)}
                        </small>
                      )}
                    </span>
                  </div>
                ))
              ) : (
                <p>得点情報はありません</p>
              )}
            </section>

            <section className="panel">
              <h2>試合情報</h2>
              <dl className="details">
                <div>
                  <dt>観客数</dt>
                  <dd>{match.attendance?.toLocaleString()}人</dd>
                </div>
                <div>
                  <dt>開催区分</dt>
                  <dd>{match.homeAway}</dd>
                </div>
                <div>
                  <dt>試合時間</dt>
                  <dd>{match.matchDuration}分</dd>
                </div>
              </dl>
            </section>
          </div>

          <section>
            <h2>出場選手</h2>
            <div className="lineup">
              {match.startingPlayers.map((player) => (
                <div key={player.playerId}>
                  <span>{player.position}</span>
                  <strong>{getPlayerName(player.playerId)}</strong>
                </div>
              ))}
            </div>
          </section>

          {match.substitutions.length > 0 && (
            <section>
              <h2>選手交代</h2>
              {match.substitutions.map((substitution, index) => (
                <div className="event" key={index}>
                  <b>
                    {formatMatchMinute(
                      substitution.minute,
                      substitution.additionalTime,
                    )}
                  </b>
                  <span>
                    IN {getPlayerName(substitution.playerInId)}
                    <small>
                      OUT {getPlayerName(substitution.playerOutId)}
                    </small>
                  </span>
                </div>
              ))}
            </section>
          )}
          <section className="panel">
            <p className="eyebrow">AUTHOR&apos;S VIEW</p>
            <h2>作成者のコメント</h2>
            {match.authorComment ? (
              <>
                <h3>{match.authorComment.summary}</h3>
                <dl className="details author-comment-details">
                  <div>
                    <dt>良かった点</dt>
                    <dd>{match.authorComment.goodPoint}</dd>
                  </div>
                  <div>
                    <dt>気になった点</dt>
                    <dd>{match.authorComment.badPoint}</dd>
                  </div>
                  <div>
                    <dt>次節への期待</dt>
                    <dd>{match.authorComment.expectation}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <p>コメントなし</p>
            )}
          </section>
        </>
      )}
    </>
  );
}
