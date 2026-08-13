# Antlers Match Hub

鹿島アントラーズの試合、シーズン成績、選手情報を表示する学習用の非公式サイトです。

## 起動方法

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## データの編集

試合や選手の情報は、`src/data`内のJSONで管理しています。

- 選手情報: `src/data/players.json`
- 試合情報: `src/data/matches.json`
- 詳しい記入方法: [`src/data/README.md`](src/data/README.md)

シーズン成績、選手成績、ランキングはJSONの内容から自動計算されます。

## 動作確認

```bash
npm run lint
npm run build
```

## 注意事項

このサイトは学習用途の非公式サイトです。現在登録されている情報には画面確認用のデモデータが含まれます。
