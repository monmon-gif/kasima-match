import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Navigation } from '@/components/Navigation';

// ファビコン用の画像とヘッダーのロゴで同じ画像を使用
import crest from './icon.png';

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
              <Image
                className="crest"
                src={crest}
                alt="鹿島アントラーズ"
                width={49}
                height={48}
                priority
              />
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
              結果の間違えや反映が遅くなります。公式情報をご確認ください。
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
}
