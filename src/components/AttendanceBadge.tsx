import type { Match } from '@/types/match';

type AttendanceBadgeProps = {
  match: Pick<Match, 'authorAttended' | 'authorAttendancePlanned'>;
};

export function AttendanceBadge({ match }: AttendanceBadgeProps) {
  if (match.authorAttended) {
    return (
      <span className="attendance-badge" title="作成者が現地観戦した試合">
        現地観戦
      </span>
    );
  }

  if (match.authorAttendancePlanned) {
    return (
      <span className="attendance-badge attendance-planned" title="作成者が現地観戦を予定している試合">
        観戦予定
      </span>
    );
  }

  return null;
}
