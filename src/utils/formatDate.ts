/** YYYY-MM-DD形式の日付を日本語の表示形式へ変換する。 */
export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    timeZone: 'Asia/Tokyo',
  }).format(new Date(`${value}T00:00:00+09:00`));
