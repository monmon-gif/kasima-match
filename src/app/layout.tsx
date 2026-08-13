import type { Metadata } from 'next';
import Link from 'next/link';

import { Navigation } from '@/components/Navigation';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '鹿島アントラーズ Match Hub',
    template: '%s | Antlers Match Hub',
  },
  description:
    '鹿島アントラーズの試合・選手・シーズン成績をまとめた非公式情報サイト',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {/* 全画面で共通表示するサイトヘッダー */}
        <header>
          <div className="header-inner">
            <Link href="/" className="brand">
              <span className="crest">A</span>
              <span>
                ANTLERS
                <br />
                <small>MATCH HUB</small>
              </span>
            </Link>

            <Navigation />
          </div>
        </header>

        {/* 各URLに対応するページコンポーネントがchildrenへ入る */}
        <main className="container">{children}</main>

        <footer>
          <div className="container">
            <b>ANTLERS MATCH HUB</b>
            <p>鹿島アントラーズを応援する学習用の非公式サイトです。</p>
            <small>
              掲載データはデモデータです。公式情報をご確認ください。
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
}
