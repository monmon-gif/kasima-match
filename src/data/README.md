# JSONデータの書き方

## 2026年11月13日の更新

- `match-2026-025`: [鹿島公式記録](https://www.antlers.co.jp/blogs/games/20261111190006)と[Jリーグ公式記録](https://www.jleague.jp/match/leaguecup/2026/111103/)に基づき、11月11日のルヴァンカップ準々決勝第1戦・横浜F・マリノス戦を3対2の勝利として更新。実際の開始時刻・入場者数・得点・先発・ベンチ・交代・カードを反映。鈴木優磨の得点のアシストは公式の得点経過からエウベルとレオ セアラを登録。ハーフタイムの交代は46分、相手選手IDはnullで記録。

## 2026年11月9日の更新

- 順位表は[Jリーグ公式順位表](https://www.jleague.jp/j1/standings/)の2026年11月8日19:24更新（第14節終了時点）に基づき、全20チームの勝・分・敗・得点・失点を反映。
- `match-2026-025`・`match-2026-026`: [横浜F・マリノス公式の準々決勝開催案内](https://www.f-marinos.com/news/match/10783)に基づき、ルヴァンカップ準々決勝の第1戦（11月11日19:00、日産スタジアム）と第2戦（11月15日15:00、メルカリスタジアム）を登録。

このフォルダでは、サイトに表示する元データをJSON形式で管理します。

- `players.json`: 選手のプロフィール
- `matches/`: 試合予定、試合結果、得点、出場選手など
- `standings/`: リーグ順位表の元データ

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

## matches/

試合データは、`matches/<season>/<matchId>.json` に1試合ずつ保存します。
ファイルを追加したら、`matches/index.ts` にimportと配列要素を追加してください。

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

作成者が現地観戦した試合は `"authorAttended": true`、現地観戦予定の試合は `"authorAttendancePlanned": true` を追加します。試合一覧・トップページの試合カード・試合詳細に、それぞれ赤い「現地観戦」、金色の「観戦予定」バッジを表示します。観戦後は予定の項目を削除して `"authorAttended": true` に変更してください。両方が `true` の場合は「現地観戦」を優先します。未設定または `false` の場合は表示しません。未設定は未観戦を意味せず、観戦状況が未登録の試合にも使えます。

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
3. `matches/<season>/<matchId>.json`へ試合を追加し、`matches/index.ts`へ登録します。
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

## 試合記録の出典・補足

- `standings/2026-j1.json`: [Jリーグ公式順位表](https://www.jleague.jp/j1/standings/2026-27/)の2026年11月1日18:28更新分（第13節終了時点）を参照し、全20クラブの勝敗・得失点を反映。
- `match-2026-019`: [Jリーグ公式記録（2026年10月31日 C大阪戦）](https://www.jleague.jp/match/j1/2026/103110/)を参照。4–1の結果、開始時刻、入場者数、得点・アシスト、先発・交代・警告を反映。途中出場した松本遥翔は[クラブ公式プロフィール](https://www.antlers.co.jp/pages/players_profile/matsumoto-haruto-2026)に基づき追加。
- `match-2026-024`: [Jリーグ公式記録（2026年10月28日 ACL Elite 浦項戦）](https://www.jleague.jp/match/acle/2026/102808/)を参照。3–0の結果、開始時刻、会場、入場者数、得点、先発・交代・警告を反映。アシストは公式記録で確認できないため未登録。両試合ともベンチ入りのみの未出場選手は未登録。
- `match-2026-016`: [Jリーグ公式記録（2026年10月9日 G大阪戦）](https://www.jleague.jp/match/j1/2026/100903/)を参照。実際の開始時刻・得点・アシスト・先発・交代・警告・入場者数を反映。ベンチ入りのみの未出場選手は未確認のため未登録。
- `match-2026-015`: [Jリーグ公式記録（2026年9月19日 川崎戦）](https://www.jleague.jp/match/j1/2026/091909/)を参照。ハーフタイムの交代は46分として記録。ベンチ入りのみの未出場選手は未確認のため未登録。監督・コーチへの警告は選手のカード集計に含めない。
- `match-2026-023`: [JFA公式記録（2026年9月23日 天皇杯3回戦 甲府戦）](https://www.jfa.jp/match/emperorscup_2026/match_page/m57.html)および[公式記録PDF](https://www.jfa.jp/match/emperorscup_2026/schedule_result/pdf/m57.pdf)を参照。アシストは得点経過の直前のパスから記録し、相手GKのクリアを挟む大森の得点はアシストなし。実際の開始時刻・入場者数は[Jリーグ公式](https://www.jleague.jp/match/emperor/2026/092317/)を参照。

- `match-2026-022`: [Jリーグ公式記録（2026年9月15日 ニューカッスル・ジェッツ戦）](https://www.jleague.jp/match/acle/2026/091503/)を参照。ハーフタイムの交代は46分として記録。ベンチ入りのみの未出場選手は未確認のため未登録。

## standings/

- `match-2026-018`: [Jリーグ公式記録（2026年10月24日 柏戦）](https://www.jleague.jp/match/j1/2026/102407/)および[柏レイソル公式記録](https://www.reysol.co.jp/game/results/202627/1024.php)を参照。実際の開始時刻・得点・アシスト・先発・ベンチ・交代・警告・入場者数を反映。ハーフタイムの交代は46分として記録。チャヴリッチの得点はJリーグ公式のアシスト記録に基づきエウベルを登録。観戦コメントはユーザーの現地での感想を基に記載。

順位表は `standings/2026-j1.json` で管理します。各チームの勝・分・敗・得点・失点を更新してください。
試合数、勝点、得失点差、順位は画面側で自動計算されます。

- `2026-j1.json`: [Jリーグ公式順位表](https://www.jleague.jp/j1/standings/)の2026年10月25日18:32更新（第12節終了時点）に基づき、全20チームの成績を反映。

## 選手情報の出典・補足

- 大森渚生（player-019）: 2026年9月16日、ユーザーが確認した公式アカウントの加入・背番号19の情報を反映。プロフィールは水戸公式の2025年マッチデープログラム（https://www.mito-hollyhock.net/wp-content/uploads/2025/04/MHH_mdp_2025_8_s.pdf）、利き足はスポニチ報道（https://news.livedoor.com/article/detail/32334161/）を参照。

- `match-2026-017`: [Jリーグ公式記録（2026年10月17日 長崎戦）](https://www.jleague.jp/match/j1/2026/101711/lineup/)および[試合速報](https://www.jleague.jp/match/j1/2026/101711/live-commentary/)を参照。開始時刻・得点・アシスト・先発・ベンチ・交代・警告・入場者数を反映。ハーフタイムの交代は46分として記録。
- `match-2026-008`: [Jリーグ公式記録（2026年10月21日 京都戦）](https://www.jleague.jp/match/j1/2026/102112/lineup/)および[ゲキサカ試合記録](https://news.livedoor.com/article/detail/32624001/)を参照。開始時刻・得点・先発・ベンチ・交代・警告・入場者数を反映。エウベルのアシストは鈴木優磨のクロス、松村の得点はこぼれ球のためアシストなし（[試合報道](https://www.nikkansports.com/soccer/news/202610210001870.html)）。ハーフタイムの交代は46分として記録。

- `match-2026-009`: [Jリーグ公式記録](https://www.jleague.jp/match/j1/2026/110709/)および[FC東京公式記録](https://www.fctokyo.co.jp/match/schedule/result/20261107/)を参照。11月7日FC東京戦の得点・先発・途中出場・交代・警告・退場・入場者数を反映。実際の開始時刻15:03は[Jリーグデータサイト](https://data.j-league.or.jp/SFMS01/search?competition_years=2026&home_away_select=0&team_ids=1)を参照。ハーフタイムの交代は46分として記録。ベンチは途中出場した5選手のみ登録。相手選手IDはnull、2枚目の警告による退場はSECOND_YELLOWで記録。ユーザーの申告に基づき現地観戦済みとして登録。
