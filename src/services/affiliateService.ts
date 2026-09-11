import offers from '@/data/affiliate/offers.json';
import type { AffiliateOffer } from '@/types/affiliate';
import type { MatchStatus } from '@/types/match';

function isRakutenAffiliateUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !url.port &&
      ['hb.afl.rakuten.co.jp', 'a.r10.to'].includes(url.hostname)
    );
  } catch {
    return false;
  }
}

/** 終了済み試合のコメント下に、登録済みの楽天案件を掲載順で返す。 */
export function getMatchAffiliateOffers(status: MatchStatus): AffiliateOffer[] {
  if (status !== 'FINISHED') return [];

  return offers
    .filter((offer) => offer.enabled && isRakutenAffiliateUrl(offer.linkUrl))
    .slice(0, 3);
}
