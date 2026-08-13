# JSONデータの書き方

このフォルダでは、サイトに表示する元データをJSON形式で管理します。

- `players.json`: 選手のプロフィール
- `matches.json`: 試合予定、試合結果、得点、出場選手など

シーズン成績や選手ランキングは、これらのJSONから自動計算されます。勝点、出場数、得点数などを別途記入する必要はありません。

## JSONを編集するときの基本ルール

- ファイル全体を `[` と `]` で囲みます。
- データが複数ある場合は、各 `{ ... }` の間にカンマを入れます。
- 最後のデータの後ろにはカンマを入れません。
- 文字列はダブルクォート `"` で囲みます。
- 日付は `YYYY-MM-DD`、時刻は `HH:mm` で記入します。
- 不明・未確定な値は、項目に応じて `null`、`""`、`[]` を使います。
- JSONにはコメントを書けません。説明はこのREADMEを参照してください。
- `playerId` と `matchId` は重複させず、一度決めたIDは変更しないでください。

## players.json

### 記入例

```json
{
  "playerId": "player-012",
  "name": "選手 太郎",
  "nameEn": "Taro Senshu",
  "number": 12,
  "position": "MF",
  "dateOfBirth": "2000-01-01",
  "height": 175,
  "weight": 68,
  "preferredFoot": "RIGHT",
  "nationality": "日本",
  "imagePath": "",
  "active": true
}
```

### 項目一覧

| 項目 | 型 | 記入内容 |
| --- | --- | --- |
| `playerId` | 文字列 | 選手固有のID。例: `player-012` |
| `name` | 文字列 | 日本語の選手名 |
| `nameEn` | 文字列 | 英語表記。ない場合は `""` |
| `number` | 数値 | 背番号 |
| `position` | 文字列 | `GK`、`DF`、`MF`、`FW` のいずれか |
| `dateOfBirth` | 文字列 | 生年月日。例: `2000-01-01` |
| `height` | 数値 | 身長（cm） |
| `weight` | 数値 | 体重（kg） |
| `preferredFoot` | 文字列 | `RIGHT`、`LEFT`、`BOTH`、`UNKNOWN` のいずれか |
| `nationality` | 文字列 | 国籍 |
| `imagePath` | 文字列 | `public`から見た画像パス。画像なしは `""` |
| `active` | 真偽値 | 在籍中は `true`、退団・移籍済みは `false` |

画像を使う場合は、たとえば `public/images/players/player-012.jpg` に画像を置き、次のように記入します。

```json
"imagePath": "/images/players/player-012.jpg"
```

## matches.json

### 開催予定試合の記入例

開催前は、スコア・勝敗・観客数を `null`、試合中に発生する情報を空配列にします。

```json
{
  "matchId": "match-2026-005",
  "season": 2026,
  "competition": "明治安田J1リーグ",
  "round": "第5節",
  "date": "2026-09-20",
  "kickoffTime": "18:00",
  "venue": "県立カシマサッカースタジアム",
  "homeAway": "HOME",
  "opponent": {
    "opponentId": "yokohama-fm",
    "name": "横浜F・マリノス"
  },
  "status": "SCHEDULED",
  "matchDuration": 90,
  "score": null,
  "result": null,
  "attendance": null,
  "goals": [],
  "startingPlayers": [],
  "substitutePlayers": [],
  "substitutions": [],
  "cards": []
}
```

### 基本項目

| 項目 | 型 | 記入内容 |
| --- | --- | --- |
| `matchId` | 文字列 | 試合固有のID。例: `match-2026-005` |
| `season` | 数値 | シーズンの年 |
| `competition` | 文字列 | 大会名 |
| `round` | 文字列 | 節またはラウンド。例: `第5節`、`準決勝` |
| `date` | 文字列 | 開催日。`YYYY-MM-DD`形式 |
| `kickoffTime` | 文字列 | 開始時刻。`HH:mm`形式 |
| `venue` | 文字列 | スタジアム名 |
| `homeAway` | 文字列 | `HOME`、`AWAY`、`NEUTRAL` のいずれか |
| `opponent` | オブジェクト | 対戦相手のIDと名前 |
| `status` | 文字列 | 下記の「試合状況」を参照 |
| `matchDuration` | 数値 | 通常は `90` |
| `score` | オブジェクト/null | 鹿島と対戦相手の得点。開催前は `null` |
| `result` | 文字列/null | 鹿島から見た勝敗。開催前は `null` |
| `attendance` | 数値/null | 観客数。未確定は `null` |

### 試合状況

| 値 | 意味 |
| --- | --- |
| `SCHEDULED` | 開催予定 |
| `LIVE` | 試合中 |
| `FINISHED` | 試合終了 |
| `POSTPONED` | 延期 |
| `CANCELED` | 中止 |

### 試合終了後のスコアと勝敗

スコアはホーム・アウェイ順ではなく、常に鹿島と対戦相手の順で記入します。

```json
"score": {
  "kashima": 2,
  "opponent": 1
},
"result": "WIN",
"attendance": 25000
```

`result`には `WIN`、`DRAW`、`LOSE` のいずれかを記入します。

### 得点情報 goals

```json
{
  "minute": 45,
  "additionalTime": 2,
  "team": "KASHIMA",
  "scorerPlayerId": "player-008",
  "assistPlayerId": "player-006",
  "goalType": "NORMAL"
}
```

| 項目 | 記入内容 |
| --- | --- |
| `minute` | 基本時間。45+2分なら `45` |
| `additionalTime` | 追加時間。45+2分なら `2`、通常は `null` |
| `team` | 鹿島なら `KASHIMA`、対戦相手なら `OPPONENT` |
| `scorerPlayerId` | 鹿島の得点者ID。対戦相手または不明なら `null` |
| `assistPlayerId` | アシストした選手ID。アシストなしなら `null` |
| `goalType` | `NORMAL`、`PENALTY`、`OWN_GOAL`、`FREE_KICK` |

### 先発選手 startingPlayers

`playerId`は、必ず `players.json`に登録されているIDを使います。

```json
{
  "playerId": "player-001",
  "position": "GK"
}
```

### ベンチ入り選手 substitutePlayers

```json
{
  "playerId": "player-010",
  "entered": true
}
```

- 途中出場した場合は `entered: true`
- ベンチ入りのみの場合は `entered: false`

### 選手交代 substitutions

```json
{
  "minute": 68,
  "additionalTime": null,
  "playerOutId": "player-005",
  "playerInId": "player-010"
}
```

### カード情報 cards

```json
{
  "minute": 51,
  "additionalTime": null,
  "team": "KASHIMA",
  "playerId": "player-004",
  "type": "YELLOW"
}
```

`type`には `YELLOW`、`SECOND_YELLOW`、`RED` のいずれかを記入します。対戦相手のカードで選手を管理しない場合、`playerId`は `null` にします。

## データを追加する手順

1. 新しい選手の場合は、先に `players.json`へ追加します。
2. 選手の `playerId`が既存データと重複していないか確認します。
3. `matches.json`へ試合を追加します。
4. 試合内の選手IDが `players.json`のIDと一致しているか確認します。
5. `npm run lint` と `npm run build` を実行します。

## よくある間違い

- `playerId`ではなく選手名を書いている
- `status`を小文字で書いている
- 開催予定なのに `score`を空オブジェクト `{}` にしている
- 数値を `"90"` のような文字列で書いている
- 配列の最後の要素に不要なカンマを付けている
- 鹿島がアウェイのとき、`score.kashima`と`score.opponent`を逆にしている

型の正式な定義は、`src/types/player.ts`と`src/types/match.ts`でも確認できます。
