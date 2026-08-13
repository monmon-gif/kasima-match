/** 45分+2分のような時間を「45+2分」形式へ変換する。 */
export const formatMatchMinute = (
  minute: number,
  additionalTime: number | null,
) => `${minute}${additionalTime ? `+${additionalTime}` : ''}分`;
