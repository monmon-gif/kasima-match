'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigation } from '@/constants/navigation';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="メインナビゲーション">
      {navigation.map(([label, href]) => {
        // 詳細画面でも親メニュー（試合・選手）を選択状態にする。
        const isActive =
          pathname === href || (href !== '/' && pathname.startsWith(href));

        return (
          <Link key={href} href={href} className={isActive ? 'active' : ''}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
