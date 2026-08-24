/** YYYY-MM-DD形式の日付を日本語の表示形式へ変換する。 */
export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    timeZone: 'Asia/Tokyo',
  }).format(new Date(`${value}T00:00:00+09:00`));

/** 未確定の候補日がある試合日程を「初日 or 翌日」で表示する。 */
export const formatMatchDate = (date: string, dateCandidates?: string[]) => {
  const candidates = dateCandidates?.length ? dateCandidates : [date];

  return candidates.map((candidate, index) => {
    const formatted = formatDate(candidate);
    if (index === 0) return formatted;

    const previous = new Date(`${candidates[index - 1]}T00:00:00+09:00`);
    const current = new Date(`${candidate}T00:00:00+09:00`);
    const sameYear = previous.getFullYear() === current.getFullYear();
    const sameMonth = sameYear && previous.getMonth() === current.getMonth();

    return new Intl.DateTimeFormat('ja-JP', {
      year: sameYear ? undefined : 'numeric',
      month: sameMonth ? undefined : 'long',
      day: 'numeric',
      weekday: 'short',
      timeZone: 'Asia/Tokyo',
    }).format(current);
  }).join(' or ');
};
