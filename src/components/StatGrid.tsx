import type { RecordStats } from '@/types/seasonStats';

type StatGridProps = {
  stats: RecordStats;
};

export function StatGrid({ stats }: StatGridProps) {
  const goalDifference =
    stats.goalDifference > 0
      ? `+${stats.goalDifference}`
      : stats.goalDifference;

  const recordItems = [
    ['試合', stats.matches],
    ['勝利', stats.wins],
    ['引分', stats.draws],
    ['敗戦', stats.losses],
    ['勝点', stats.points],
  ];

  const goalItems = [
    ['得点', stats.goalsFor],
    ['失点', stats.goalsAgainst],
    ['得失点差', goalDifference],
  ];

  return (
    <div className="record-stat-grid">
      <div className="stat-grid record-stats">
        {recordItems.map(([label, value]) => (
          <div
            className={`stat${label === '勝点' ? ' stat-primary' : ''}`}
            key={label}
          >
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="goal-balance">
        <p>GOAL BALANCE</p>
        <div className="stat-grid goal-stats">
          {goalItems.map(([label, value]) => (
            <div
              className={`stat${label === '得失点差' ? ' stat-difference' : ''}`}
              key={label}
            >
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
