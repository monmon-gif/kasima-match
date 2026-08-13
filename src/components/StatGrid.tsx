import type { RecordStats } from '@/types/seasonStats';

type StatGridProps = {
  stats: RecordStats;
};

export function StatGrid({ stats }: StatGridProps) {
  const goalDifference =
    stats.goalDifference > 0
      ? `+${stats.goalDifference}`
      : stats.goalDifference;

  const items = [
    ['試合', stats.matches],
    ['勝利', stats.wins],
    ['引分', stats.draws],
    ['敗戦', stats.losses],
    ['勝点', stats.points],
    ['得点', stats.goalsFor],
    ['失点', stats.goalsAgainst],
    ['得失点差', goalDifference],
  ];

  return (
    <div className="stat-grid">
      {items.map(([label, value]) => (
        <div className="stat" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
