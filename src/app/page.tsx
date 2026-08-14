import Image from 'next/image';
import Link from 'next/link';

import { MatchCard } from '@/components/MatchCard';
import { StatGrid } from '@/components/StatGrid';
import {
  getLatestMatch,
  getMatches,
  getNextMatch,
} from '@/services/matchService';
import { getActivePlayers } from '@/services/playerService';
import { calculatePlayerStats } from '@/utils/calculatePlayerStats';
import { calculateSeasonStats } from '@/utils/calculateSeasonStats';

const CURRENT_SEASON = 2026;

export default function Home() {
  // 画面ではJSONを直接読まず、ServiceとUtilityから表示用データを作る。
  const matches = getMatches();
  const latestMatch = getLatestMatch(CURRENT_SEASON);
  const nextMatch = getNextMatch(CURRENT_SEASON);
  const seasonStats = calculateSeasonStats(matches, CURRENT_SEASON);

  const playerRankings = getActivePlayers().map((player) => ({
    player,
    ...calculatePlayerStats(matches, player.playerId),
  }));

  const topScorer = [...playerRankings].sort(
    (first, second) => second.goals - first.goals,
  )[0];
  const topAssister = [...playerRankings].sort(
    (first, second) => second.assists - first.assists,
  )[0];

  return (
    <>
      {/* サイトの主題と主要導線 */}
      <section className="hero">
        <div>
          <p className="eyebrow">26/27 SEASON</p>
          <h1>
            共闘
            <br />
            <em>Fight together</em>
          </h1>
          <p>試合の熱を、数字と記録で振り返る。</p>
          <Link className="button" href="/matches">
            試合日程を見る →
          </Link>
        </div>
        <div className="hero-stag" aria-hidden="true">
          <Image
            src="/images/hero-stag.png"
            alt=""
            width={1536}
            height={1024}
            priority
          />
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <p className="eyebrow">SEASON RECORD</p>
            <h2>今シーズンの成績</h2>
          </div>
          <Link href="/season-stats">詳しく見る →</Link>
        </div>
        <StatGrid stats={seasonStats} />
      </section>

      <div className="two-col">
        {nextMatch && (
          <section>
            <div className="section-head">
              <h2>次の試合</h2>
            </div>
            <MatchCard match={nextMatch} />
          </section>
        )}

        {latestMatch && (
          <section>
            <div className="section-head">
              <h2>直近の結果</h2>
            </div>
            <MatchCard match={latestMatch} />
          </section>
        )}
      </div>

      <section>
        <div className="section-head">
          <div>
            <p className="eyebrow">PLAYER LEADERS</p>
            <h2>チーム内ランキング</h2>
          </div>
          <Link href="/rankings">ランキング →</Link>
        </div>

        <div className="leader-grid">
          {topScorer && (
            <div className="leader">
              <span>GOALS</span>
              <strong>{topScorer.goals}</strong>
              <h3>
                #{topScorer.player.number} {topScorer.player.name}
              </h3>
              <p>得点ランキング 1位</p>
            </div>
          )}

          {topAssister && (
            <div className="leader dark">
              <span>ASSISTS</span>
              <strong>{topAssister.assists}</strong>
              <h3>
                #{topAssister.player.number} {topAssister.player.name}
              </h3>
              <p>アシストランキング 1位</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
