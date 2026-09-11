import type { AffiliateOffer } from '@/types/affiliate';

export function AffiliateSection({ offers }: { offers: AffiliateOffer[] }) {
  if (offers.length === 0) return null;

  return (
    <section className="panel affiliate-section" aria-labelledby="affiliate-heading">
      <p className="affiliate-disclosure">
        <span className="affiliate-pr">PR</span>
        この枠には楽天アフィリエイトの広告を含みます。
      </p>
      <h2 id="affiliate-heading">次のスタジアム観戦に備える</h2>
      <p className="affiliate-intro">観戦に役立つアイテムを楽天市場でチェック。</p>
      <div className="affiliate-grid">
        {offers.map((offer) => (
          <article className="affiliate-card" key={offer.id}>
            {offer.imageUrl && (
              <a
                className="affiliate-image-link"
                href={offer.linkUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                {/* 楽天発行の画像URLを維持し、最適化プロキシを通さず表示する。 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={offer.imageUrl}
                  alt={offer.imageAlt ?? offer.title}
                  width={240}
                  height={240}
                  loading="lazy"
                />
                <span className="sr-only">（楽天市場を新しいタブで開きます）</span>
              </a>
            )}
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <a
              className="button"
              href={offer.linkUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
            >
              {offer.buttonLabel} <span aria-hidden="true">↗</span>
              <span className="sr-only">（新しいタブで開きます）</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
