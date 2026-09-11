import offers from '@/data/affiliate/offers.json';
import type { AffiliateOffer } from '@/types/affiliate';

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

/** 全ページ共通の下部枠に、登録済みの楽天案件を掲載順で返す。 */
export function getAffiliateOffers(): AffiliateOffer[] {
  return offers
    .filter((offer) => offer.enabled && isRakutenAffiliateUrl(offer.linkUrl))
    .slice(0, 3);
}
