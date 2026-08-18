import { getStandings } from '@/services/standingsService';

export const metadata = { title: '順位表' };

const formatDifference = (difference: number) =>
  difference > 0 ? `+${difference}` : String(difference);

export default function StandingsPage() {
  const standings = getStandings();

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">STANDINGS</p>
        <h1>J1 順位表</h1>
        <p>
          {standings.competition}・{standings.updatedAt} 更新
        </p>
      </div>

      <section className="standings-panel">
        <div className="standings-scroll">
          <table className="standings-table">
            <thead>
              <tr>
                <th>順位</th>
                <th className="team-column">チーム</th>
                <th>試合</th>
                <th>勝</th>
                <th>分</th>
                <th>敗</th>
                <th>得点</th>
                <th>失点</th>
                <th>得失差</th>
                <th>勝点</th>
              </tr>
            </thead>
            <tbody>
              {standings.teams.map((team) => {
                const isKashima = team.teamId === 'kashima-antlers';

                return (
                  <tr className={isKashima ? 'kashima-standing' : undefined} key={team.teamId}>
                    <td className="standing-rank">{team.rank}</td>
                    <th className="team-column" scope="row">
                      {isKashima && <span className="antlers-marker">ANTLERS</span>}
                      {team.name}
                    </th>
                    <td>{team.played}</td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.losses}</td>
                    <td>{team.goalsFor}</td>
                    <td>{team.goalsAgainst}</td>
                    <td>{formatDifference(team.goalDifference)}</td>
                    <td className="standing-points">{team.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="standings-note">順位データは手動更新です。最新情報は公式情報もご確認ください。</p>
      </section>
    </>
  );
}
