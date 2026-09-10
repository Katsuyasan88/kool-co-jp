# T-072 ガチャちょうLP 1.0.3 / Nature 改修 自己レビュー

- 作成日: 2026-09-09
- 対象タスク: CapCole `T-072`（UT-046）。既存 `/gachacho` LPの掲載画像を1.0.3版3枚へ更新し、生成り・深緑・セージ・くすんだ青のネイチャー調へ整える
- 指示文: `docs/IMPLEMENTATION_PROMPT.md`
- 仕様: `C:/Users/user/AIProjects/CapCole/design/exploration/v1.0.3/lp-nature-handoff/LP_REVISION_SPEC.md`、同 `ASSET_MANIFEST.json`
- ブランチ: `feature/gachacho-privacy-support`（HEAD `69960e3`）
- 追記（2026-09-09 同日）: ユーザー指示により Hero 画像を添付のネイチャー調イラスト（受け渡し一式の 04 原本と同一）へ差し替え、「（無料）」表記を復活。さらに Hero の見出し・副見出しの視覚表示を外して画像を幅いっぱいに拡大し、画像の余白が紙色へ溶け込むよう色調整。§2・§3・§4・§5・§8・§9 を更新
- 状態: **本番公開済み（2026-09-09）**。ユーザーの表示採否 OK と公開承認（App Store 1.0.3 未公開のまま LP を先行させる判断を含む）を受け、commit `efaa1a4` を deploy。詳細は §12
- 触っていないもの: CapCole のアプリ／backend／法務本文、`public/gachacho/legal/**`、`/terms` リダイレクト、`App.tsx` のルーティング、Navbar / Footer、primary 色、ストア管理画面、OAuth設定、AWS

## 1. 着手前の確認

| 項目 | 結果 |
|---|---|
| ブランチ / `git status --short` | `feature/gachacho-privacy-support`。既存の未追跡: `.claude/`、`docs/IMPLEMENTATION_PROMPT.md`、`reviews/Codex/20260904_T059_review.md`（いずれも本作業で変更なし）。追跡ファイルの既存差分なし |
| 旧 `gachacho-*` 色の使用箇所 | `src/pages/Gachacho.tsx` のみ（grep で再確認）。他ページ・共通コンポーネントでの使用なし |
| 旧アイコン `/gachacho/icon-512.webp` の参照 | `Gachacho.tsx`（Hero・末尾CTA）と `Service.tsx`（ガチャちょう紹介）の3箇所 |
| 受け渡し素材 | `assets/original/` 4枚＋アイコンを目視。3枚目の上側端末が逆向きなのは向かい合う構図として維持 |

## 2. 変更ファイル

| ファイル | 変更内容 |
|---|---|
| `src/pages/Gachacho.tsx` | LP全体を改修（下記3〜5）。ルート・`usePageTitle(APP_NAME)`・`useCanonical('/gachacho')`・法務／問い合わせ導線・Apple公式バッジは維持 |
| `tailwind.config.js` | `colors['gachacho-nature']`（paper / surface / forest / ink / muted / sage / sage-soft / blue / line / pink）と `fontFamily['gachacho-display']`（Yu Mincho → Hiragino Mincho ProN → serif）を追加。LP以外で未使用だった旧 `gachacho` ピンク系トークンは削除。`primary` 等の既存トークンは変更なし |
| `src/index.css` | `.gachacho-hero-fade`（Hero イラストの四辺を紙色へ溶かす mask）を追加。他ページへの影響なし |
| `src/pages/Service.tsx` | ガチャちょう紹介カードのアイコンだけ `/gachacho/icon-1.0.3-512.webp` へ。その他の事業紹介は変更なし |
| `public/gachacho/*-1.0.3-*.webp` | 新規14点（下記3。ストア画像9点＋アイコン1点＋Hero 4点）。旧画像 `store-0*.webp`・`icon-512.webp` は削除していない |
| `reviews/Claude Code/20260909_T072_screenshots/` | 新規。検証スクショ13点 |

依存ライブラリの追加・ルート新設なし。外部フォントの追加なし。

## 3. 素材対応

`assets/web/` の10点を `public/gachacho/` にコピーし、SHA-256 が `ASSET_MANIFEST.json` と全点一致することを確認（回転・トリミング・色変更なし。Temp への参照なし）。

| 添付 | 公開パス | LPでの用途 | alt |
|---|---|---|---|
| 1 | `/gachacho/store-01-capture-1.0.3-{480,720,1080}.webp` | 使い方01（lazy） | ガチャちょうの紹介画像。台紙を撮影してコレクション帳を作る |
| 2 | `/gachacho/store-02-ai-collection-1.0.3-{480,720,1080}.webp` | 使い方02（lazy） | ガチャちょうのAI読み取りと、保存前にラインナップを確認する画面 |
| 3 | `/gachacho/store-03-show-together-1.0.3-{480,720,1080}.webp` | 使い方03（lazy） | 向かい合ってガチャちょうを見せ合う紹介画像。集めたアイテムと所持数が表示されている |
| 4 | `/gachacho/hero-nature-1.0.3-{720,1080,1440,1795}.webp` | **Hero 画像**（`fetchPriority="high"`、`src` は1440版 1440×703）。ユーザー指示（2026-09-09）で原本 `04-nature-reference.png`（SHA-256 `8cfa9a6b…`、manifest と一致）を比率維持で WebP 化（品質90、PIL）。**色調整**: 余白色 (250,245,240) が純白になるよう各チャンネルを線形スケール（×255/250, ×255/245, ×255/240）し、LP 側で `mix-blend-multiply` を掛けて余白を紙色 `#FAF7F0` と一致させる。四辺は `.gachacho-hero-fade` の mask（各辺10%）で溶かす。回転・トリミングなし。h1・副見出しは `sr-only` で HTML テキストとして維持 | 生成りの机に開いた2冊の手帳へ、プリンやクロワッサンなどのガチャのチャームを貼ったイラスト。「集めて、見せ合う。シール帳みたいな、ガチャちょう。」 |
| アイコン | `/gachacho/icon-1.0.3-512.webp` | Hero・末尾CTA・`/service` | 空（隣にアプリ名あり） |

ストア画像は `src` = 720版、`width=720 height=1558`、`srcSet` に3サイズ、`sizes` は使い方 `(min-width:768px) 280px, (min-width:300px) 260px, calc(100vw - 40px)`。Hero は `sizes="(min-width:1280px) 1120px, (min-width:768px) calc(100vw - 80px), calc(100vw - 48px)"`（4サイズ）。Hero 画像には枠・影を付けない。外装は直立・`h-auto`・1px罫線色ボーダー・角丸12px・中性色の薄い影のみ。追加のスマホ枠・回転・ピンクの影・`object-fit: cover` なし。1440px で Hero 画像は1120px（1440版）、使い方は約278px 幅（480版が選択される）。Hero WebP の SHA-256: 720 `02e5c761…`、1080 `dcc5d139…`、1440 `a416ea5b…`、1795 `953c64d6…`。

## 4. 見た目・原稿の変更点

| 対象 | 変更後 |
|---|---|
| 基調 | 主背景 paper、使い方・情報欄 surface、末尾CTA・AI注意 sage-soft。ぼかし円・グロー・色付き影・要素の傾きを全て撤去 |
| h1 | 「集めて、見せ合う。」を `sr-only` の HTML テキストとして維持（画像内の同文言と重複するため視覚表示はしない）。`font-gachacho-display` は末尾CTAの見出しと使い方の番号で使用 |
| 副見出し | 「シール帳みたいな、ガチャちょう。」も `sr-only` |
| Hero本文・CTA | 仕様書の原稿。配信補足は「iPhone向けに配信中（無料）。Android版は準備中です。」（「（無料）」はユーザー指示で維持） |
| Hero構成 | イラストをコンテナ幅いっぱい（最大1120px）に表示し、その下にアプリ名・本文・CTA を中央寄せ。全幅で同じ縦並び |
| 使い方 | h2「撮って、集めて、見せ合おう。」、3項目の見出し・本文を仕様書どおり。DOMは番号・見出し・本文 → 画像の順で固定し、PCでは01/03の画像を左（`md:order`）、02のみ右 |
| 記録できること | h2「集めた日も、思い出のひとつ。」、6項目を仕様書の短文へ。固定高さ・`truncate` を廃止して折り返し可能に |
| AIの読み取りについて | 本文維持、付箋を sage-soft・傾きなしへ。テープ装飾はここ1箇所のみ |
| 末尾CTA | 「今日のひとつを、見せたい一冊に。」「ガチャちょうで、集める時間も、見せ合う時間も楽しもう。」新アイコン＋公式バッジ、背景 sage-soft |
| リンク | 深緑＋下線。`focus-visible` で2px輪郭。テキストリンクは `py-2` でタップ高さ約45px |
| 装飾 | 節ラベルの小さな葉アイコン（sage）と付箋のテープのみ。スクショ・文章の上に装飾なし |

実装上の補足:

- `index.css` の `* { font-main }` が `span` にも効くため、見出しを「、」で折り返すための `inline-block` span に `[font-family:inherit]` を付けて明朝を継承させた（初回の検証で見出しがゴシックに落ちていたのを修正）。
- 本文の JSX 改行が半角スペースとして描画されていたため、文字列連結に変更。

## 5. 実施コマンドと結果

| コマンド | 結果 |
|---|---|
| `npm run lint` | exit 0（警告なし） |
| `npm run build`（`tsc -b && vite build`） | exit 0（Hero 再構成後に再実行）。`Gachacho-BKW4H3o-.js` 15.49 kB、`index-LWaStrV-.css` 41.76 kB。PLUGIN_TIMINGS の警告は既存 |
| `git diff --check` | exit 0（「LF will be replaced by CRLF」は `core.autocrlf` の既存挙動の警告で、空白エラーではない） |

## 6. 画面・リンク確認

Vite dev（`http://localhost:5173`）に対し、headless Chrome（CDP）で各幅を末尾までスクロールして `whileInView` を発火させたうえで全体をキャプチャ。

| 確認 | 結果 | スクショ |
|---|---|---|
| 1440 / 1024 / 768 / 390 / 320px | `scrollWidth == clientWidth`（横スクロールなし）。画像の切り落とし・文字切れなし。LP 自身のルート要素からは `overflow-x-hidden` を撤去（`src/index.css` の `body` には既存の `overflow-x-hidden` が残る。検証条件は末尾「Codexレビュー指摘への対応」を参照） | `gachacho_{1440,1024,768,390,320}_full.webp` |
| 320px Hero / 使い方03 / 記録欄 | h2・h3 は「、」でのみ折り返し、末尾一文字の孤立なし。Hero 画像272px幅・バッジ48px高が収まる | `gachacho_320_{hero,step03,records}.webp` |
| 文字200%（`html{font-size:200%}`、390px） | LP内の要素に横はみ出しなし。アプリ名ブロックは `min-w-0` + `overflow-wrap:anywhere` で折り返す。共通 Navbar（ロゴ＋ハンバーガー）は 441px まではみ出す＝既存・LP対象外（下記8） | `gachacho_390_text200.webp` |
| reduced motion | フェードのみで位置移動・hover移動なし。全情報が表示される | `gachacho_1440_reduced_motion.webp` |
| キーボード | Tab で LP内7リンク（Hero バッジ → 運営者 → App Store → 問い合わせ → 規約 → プライバシー → 末尾バッジ）に到達、`:focus-visible` で `solid 2px` 輪郭 | `gachacho_1024_keyboard_focus.webp` |
| タップ領域 | バッジリンク 84px、テキストリンク 約45px | — |
| `/gachacho` 直接アクセス | title「ガチャちょう \| 株式会社SmartThanks」、h1「集めて、見せ合う。」が `sr-only` の HTML テキスト | — |
| `/terms` → `/gachacho/terms` | リダイレクト維持、規約ページ描画 | — |
| `/privacy#gachacho` | `id="gachacho"` 節に到達 | — |
| `/contact?type=gachacho` | 件名が「ガチャちょうの使い方・不具合について」に自動選択 | — |
| `/service` | ガチャちょうカードのアイコンが `icon-1.0.3-512.webp`、公式ページリンク維持 | `service_1440.webp` |
| コンソール | エラーなし | — |

コントラスト（計算値、WCAG AA 4.5:1 目標）:

| 文字 | paper | surface | sage-soft |
|---|---|---|---|
| forest | 10.86 | 11.45 | 9.77 |
| ink | 10.63 | 11.20 | 9.56 |
| muted | 5.70 | 6.00 | 5.13 |

blue（3.76 on surface）は使い方の大きな番号「01〜03」（36〜48px）だけに使用し、小さな本文には使っていない。opacity による文字の減光は使用していない。

## 7. 仕様書 §7 受け入れ条件の自己判定

- [x] 掲載画像は指定1〜3の3枚。Figma6枚・Web仮画面は含まない
- [x] 新しい手帳アイコンを使用。旧参照3箇所（LP Hero・末尾CTA・`/service`）を更新
- [x] 主な面が生成り／セージ、文字が深緑／ink
- [x] 「集めて、見せ合う。」「シール帳みたいに、見せ合おう。」がHTMLテキスト（前者は `sr-only`。視覚的には Hero イラスト内の同文言が担う）
- [x] ピンクは完成画像内のみ。にじみ・色付き影を解消（`gachacho-nature.pink` は定義のみで未使用）
- [x] 画像の比率・全体・3枚目の向きを維持
- [x] width/height・srcSet/sizes・Hero優先読み込み・下部lazy
- [x] lint / build / diff --check
- [x] 5幅で横スクロール・切れなし
- [x] 390・1440全体、320のHero・使い方03・記録欄のスクショ
- [x] 文字200%・Tab・フォーカス・44px（Navbar の既存はみ出しを除く）
- [x] コントラスト
- [x] reduced motion
- [x] 直接アクセス・全CTA・法務・問い合わせ・`/service` 入口
- [x] `/gachacho/terms`・`/privacy#gachacho`・旧 `/terms`
- [x] 素材 manifest 照合・Temp参照なし・旧版コメントなし

## 8. 未確認事項・残課題

- **App Store 1.0.3 の一般公開状況**は未確認。LPは掲載画像を1.0.3版へ変えるだけで版番号を本文に出していないが、サイト公開の直前に App Store Connect で確認すること（TestFlight 処理完了を公開と扱わない）
- **Android の公開状況**は未確認のため「Android版は準備中です。」を維持
- Hero の h1 は視覚的に非表示（画像内文言で代替）。仕様書 §4「HTMLのh1に置く。画像内の見出しだけにアプリの説明を任せない」からはユーザー指示で外れているため、公開判断時に了解を得ること。alt にも同文言を含むため読み上げでは h1 と二重になる（alt を空にする選択肢あり）
- `mix-blend-multiply` は主要ブラウザで利用可だが、Hero の余白が紙色と一致するのは背景が `paper` のときのみ。印刷や強制カラーモードでは通常表示に戻る
- 共通 Navbar は `html{font-size:200%}` 相当（実質195px幅）で横にはみ出す。LP改修の対象外で今回は変更していない。対応する場合は別タスク
- 実機 iOS Safari / Android Chrome での確認は未実施（headless Chrome と Windows のみ）
- 明朝は OS 搭載フォント依存（Windows: Yu Mincho、macOS/iOS: Hiragino Mincho ProN）。Android 等で未搭載の場合は serif フォールバック。外部フォントは追加していない
- OG画像・各ストアの画像差し替えは対象外（未実施）
- 本レビューは dev サーバー上の確認。`dist/` の成果物は build 成功のみで、`vite preview` での再確認は未実施

## 9. 公開担当への記録（今回は実行しない）

対象（S3 sync で増減するもの）:

- 新規オブジェクト: `gachacho/icon-1.0.3-512.webp`、`gachacho/store-0{1,2,3}-*-1.0.3-{480,720,1080}.webp`、`gachacho/hero-nature-1.0.3-{720,1080,1440,1795}.webp`（計14点）
- ビルドで変わるもの: `index.html`、`assets/index-*.css`、`assets/index-*.js`、`assets/Gachacho-*.js`、`assets/Service-*.js`（ハッシュ付き。最終 build では `Gachacho-BKW4H3o-.js`、`index-LWaStrV-.css`、`index-Du4aEH6J.js`）
- 旧画像 `gachacho/store-0*.webp`、`gachacho/icon-512.webp` は削除しない（sync の削除オプションを使わない）

CloudFront 無効化: 既存運用（`infrastructure/scripts/deploy.ps1`、`docs/DEPLOYMENT.md`）に従い、`/index.html` と `/gachacho`・`/service` の到達に必要な範囲を対象にする。新規オブジェクトはキャッシュ未保持のため無効化不要。一括削除やインフラ設定変更を本書から推測して実行しない。

rollback: 直前の commit（`69960e3`）で `npm run build` した成果物を再 sync し、同じ範囲を無効化する。新規画像14点は残っていても旧 LP から参照されないため害はない。

## 10. 提出物

- 変更ファイル: 上記2
- スクショ: `reviews/Claude Code/20260909_T072_screenshots/`（13点。Hero 差し替え後に再取得。`gachacho_1440_hero.webp` を追加）
- 本レビュー: `reviews/Claude Code/20260909_T072_gachacho_lp_nature_review.md`
- プレビュー: `npm run dev` → `http://localhost:5173/gachacho`

## 11. Codexレビュー指摘への対応（2026-09-09、同一T-072内）

- 参照: `C:/Users/user/AIProjects/CapCole/reviews/Codex/20260909_T072_review.md`（判定: LP実装レビュー合格・ユーザー確認待ち）
- 対応範囲: 非ブロッキング補足3点への記述補足と検証条件の追記のみ。実装コードの変更なし。commit / push / deploy は個別指示どおり未実施。T-072 / UT-046 は着手中を維持

### 指摘1: `overflow-x-hidden` の記述範囲と検証条件

- 訂正: §6 の「祖先の `overflow-x-hidden` は撤去済み」は **LP のルート要素（`Gachacho.tsx` の最上位 `div`）から外した** という意味に限定する。`src/index.css` の `body { overflow-x-hidden }` は既存のグローバル CSS で、今回変更していない（変更は求められていない）
- 従来の5幅検証の条件: `document.documentElement.scrollWidth` と `clientWidth` の比較。`scrollWidth` は `overflow-x: hidden` でも内容幅を返すため、はみ出しは検出できる（実際に文字200%テストでは `441 > 390` を検出している）。ただし body の制約を解除した状態ではなかった
- 再検証（headless Chrome / CDP、各幅で末尾までスクロールして描画後に計測）: `body` と `html` の `overflow-x` を一時的に `visible` へ上書きしたうえで、`scrollWidth` と、全要素の `getBoundingClientRect()` がビューポートの左右端を越えないことを確認

| 幅 | body 解除前 scrollWidth | 解除後 scrollWidth | 端を越える要素 |
|---|---|---|---|
| 1440 | 1440 | 1440 | なし |
| 1024 | 1024 | 1024 | なし |
| 768 | 768 | 768 | なし |
| 390 | 390 | 390 | なし |
| 320 | 320 | 320 | なし |

- 結論: 通常の文字サイズでは、body の `overflow-x-hidden` に依存せずページ全体（Navbar / Footer 含む）にはみ出しがない。文字200%相当（`html{font-size:200%}`、390px）で共通 Navbar が 441px まではみ出す点は §6・§8 のとおり既存課題で、body の制約により実際には横スクロールは発生しない

### 指摘2: Hero の h1・副見出しと alt の重複

- 現状維持。alt にイラストの説明と画像内文言の両方を含めているため、読み上げでは `sr-only` の h1・副見出しと文言が重複する
- 改善案として、alt をイラストの説明のみ（「生成りの机に開いた2冊の手帳へ、ガチャのチャームを貼ったイラスト」）に絞る変更を UT-046 の表示採否と合わせてユーザーに提示する。合格の必須条件ではないため、指示があれば同一タスク内で対応する

### 指摘3: Hero 追加変更の扱い

- Hero を 04 イラストへ変更、見出し・副見出しを視覚非表示、「（無料）」維持の3点は **2026-09-09 のユーザー追加指示による変更** であり、受け渡し仕様 `LP_REVISION_SPEC.md` §5 の Hero 構成（03 画像＋HTML 見出し）とは異なる。公開工程では旧 Hero 構成へ戻さないこと
- 公開時の参照: §9 の対象一覧（新規画像14点、ハッシュ付き JS / CSS、`index.html`）

### UT-046 確認用プレビュー

- ローカル: `npm run dev` → `http://localhost:5173/gachacho`（レビュー時点で起動中）
- スクショ: `reviews/Claude Code/20260909_T072_screenshots/` の `gachacho_1440_full.webp`（PC）、`gachacho_390_full.webp`・`gachacho_320_full.webp`（モバイル）、`gachacho_1440_hero.webp`・`gachacho_320_hero.webp`（Hero 拡大）
- 確認してほしい点: Hero イラストの紙色への溶け込みと四辺のマスク、見出しを画像内文言に任せる構成の採否、alt の扱い（指摘2）、サイト公開の判断（App Store 1.0.3 公開状況・Android 準備中・無料表記の実状態との照合は公開直前に実施）

## 12. 公開工程（2026-09-09）

### 公開直前の照合

| 項目 | 結果 |
|---|---|
| App Store `id6798359468` の公開状況 | 最新バージョン **1.0.2**（1日前リリース）、価格 無料、iPhone のみ。**1.0.3 は未公開** |
| ユーザー判断 | 上記を報告のうえ「先行させてOK」の明示承認を取得。1.0.3 用のストア画像と「＋で所持数を記録」「日付ごとのリスト／月ごとの記録」の説明を、1.0.3 の一般公開前に LP へ先行掲載する |
| 無料表記 | App Store の「無料」と一致 |
| Android | 公開状況は未確認のため「Android版は準備中です。」を維持 |
| ブランチ | `feature/gachacho-privacy-support`。`origin/main` との差は空のマージコミット2件のみ（ファイル差分なし）のため main の取り込みは不要 |

### 実施内容

| # | 手順 | 結果 |
|---|---|---|
| 1 | 検証スクショを PNG → WebP へ変換（リポジトリ容量のため）、レビューmd の参照を更新 | 13点 |
| 2 | `git commit` `efaa1a4`「feat: ガチャちょうLPを1.0.3ストア画像とNature基調へ改修（T-072）」 | 対象: `src/index.css`、`src/pages/Gachacho.tsx`、`src/pages/Service.tsx`、`tailwind.config.js`、`public/gachacho/*-1.0.3-*.webp`（14点）、`docs/IMPLEMENTATION_PROMPT.md`、本レビューmd、スクショ。`.claude/`・`reviews/Codex/` は含めない |
| 3 | `git push -u origin feature/gachacho-privacy-support` | `69960e3..efaa1a4` |
| 4 | `.\infrastructure\scripts\deploy.ps1` | Build → assets sync（旧ハッシュ chunk を削除、新 chunk 配置）→ 静的ファイル sync（新規画像14点を配置。旧 `store-0*.webp`・`icon-512.webp` は `dist` に残るため削除されない）→ 法務JSON（`application/json; charset=utf-8`、内容変更なし）→ `index.html` → CloudFront Invalidation `/*`（ID `I9AC80NNNN24ZVSE5I8J2Q6ZM9`）。`Deployment complete!` |
| 5 | deploy tag | `deploy/20260909-t072` を `efaa1a4` に付与し push |

### 公開後確認（Invalidation `Completed` 後、`Cache-Control: no-cache` で取得）

| URL | 結果 |
|---|---|
| `/gachacho` `/gachacho/terms` `/privacy` `/terms` `/service` | 200、`index.html`（2725B）が新 `index-Du4aEH6J.js` / `index-LWaStrV-.css` を参照 |
| `/assets/Gachacho-BKW4H3o-.js` | 200。「集めて、見せ合う。」「hero-nature-1.0.3」「iPhone向けに配信中（無料）」を含む |
| `/gachacho/icon-1.0.3-512.webp`、`hero-nature-1.0.3-1440.webp`、`store-0{1,2,3}-*-1.0.3-720.webp` | 200、`image/webp`。バイト数はローカルと一致（5104 / 96826 / 130092 / 142242 / 88188） |
| `/gachacho/legal/current.json` | 200、`application/json; charset=utf-8`（28373B。文書版は今回変更なし） |
| 本番描画（headless Chrome、1440 / 390） | 横スクロールなし。Hero イラスト・Nature 配色・使い方3枚・末尾CTA を確認。`production_1440_full.webp`、`production_390_full.webp`、`production_1440_hero.webp` |

### 残る事項

- 実機 iOS Safari / Android Chrome での本番確認は未実施（ユーザーの実機確認を推奨。特に Hero の `mix-blend-multiply` とマスク）
- App Store 1.0.3 の一般公開後に、LP の説明と実アプリの整合を再確認する。1.0.3 公開までは LP が先行している状態
- rollback が必要な場合は `deploy/20260906-t059-legal-1.3`（直前の公開）へ checkout して `deploy.ps1`。互換性 floor（規約URL・法務JSON）は両版とも満たす
- T-072 / UT-046 の完了判定（`[x]` 化・アーカイブ）は CapCole 側の Codex 判断に委ねる

## 13. Google Play バッジの追加（2026-09-09 ローカル実装 → 2026-09-10 公開。§15）

- 指示: Android 審査を進めているため、Google Play の公式バッジ（JP「で手に入れよう」）と Play ストアリンクを LP へ追加する。今回は **ローカル変更まで**（commit / push / deploy なし）
- ストア URL: `https://play.google.com/store/apps/details?id=jp.co.kool.gachacho`

### 変更ファイル

| ファイル | 変更内容 |
|---|---|
| `public/gachacho/google-play-badge-jp.svg` | 新規。Google 配布の `Google Play Badge guidelines.zip`（`Get it on Google Play Badges/Digital/svg/GetItOnGooglePlay_Badge_Print_color_Japanese.svg`、180×53.33）をそのまま配置。改変なし |
| `src/pages/Gachacho.tsx` | `GOOGLE_PLAY_URL` / `GOOGLE_PLAY_BADGE` を追加。App Store / Google Play の公式バッジを同じ高さ（48px / 60px）で並べる `StoreBadges` を Hero と末尾CTAで使用。情報欄「配信」に Google Play（Android）リンクを追加し「Android版は準備中です。」を削除。配信補足を「iPhone / Android向けに配信中（無料）。」、ラベルを「iOS / Android App by SmartThanks」へ |

### 検証

| 項目 | 結果 |
|---|---|
| `npm run lint` / `npm run build` / `git diff --check` | すべて exit 0 |
| 1440 / 390 / 320px | 横スクロールなし。バッジ2つは PC で横並び、320px では縦に折り返す（`flex-wrap`）。`local_gp_{1440,390,320}_full.webp`、`local_gp_{1440,390,320}_hero.webp`、`local_gp_390_bottom.webp` |
| Play ストア URL | 2026-09-09 時点で **HTTP 404**（審査中・未公開）。LP のリンク先はまだ到達できない |

### 公開時の条件・残る事項

- **Google Play で一般公開が確認できてから deploy する**。それまでは本番（`deploy/20260909-t072`）の「Android版は準備中です。」を維持する。公開前に Play ストア URL が 200 で開くこと、無料表記、パッケージ名 `jp.co.kool.gachacho` を照合する
- LP 以外の表記もユーザー指示で更新（ローカルのみ）: `src/pages/Service.tsx` のガチャちょう紹介を「iOS/Androidアプリ公開中」（スマホ幅で3行に折れるためユーザー指示で短縮。PC も共通。ラベルとアプリ名の間に `mb-1.5`（6px）を追加）、`src/components/Footer.tsx` のリンクを「ガチャちょう（iOS / Androidアプリ）」へ。これらも Google Play 公開確認後に LP と同時に deploy する
- Google Play バッジのガイドライン（周囲の余白・最小高さ・改変禁止）は Apple バッジと同じ扱い（`p-3` の余白、高さ 48px 以上、改変なし）で満たしている想定。ガイドライン本文（zip 内 PDF なし）との照合はユーザー側で確認
- Android 版の実機（Android Chrome）表示確認は未実施

## 14. `/gachacho` のページ別 OGP・タイトル（2026-09-10 ローカル実装 → 同日公開。§15）

- 指示: ガチャちょうのページに OGP を設定し、タイトル・説明で会社名よりサービス名を前に出す
- 前提: このサイトは SPA で、SNS / LINE / Slack のクローラーは JS を実行せず `index.html` の `<head>` だけを読む。React 側で meta を書き換えても OGP には反映されないため、**ビルド時にページ別の静的 HTML を生成し、S3 のキー `gachacho` に置いて `/gachacho` をそのオブジェクトで直接返す**方式にした。CloudFront の設定変更（Function 追加やビヘイビア変更）は不要（origin は S3 REST エンドポイント、`/gachacho` はキー `gachacho` にそのまま対応する）

### 変更ファイル

| ファイル | 変更内容 |
|---|---|
| `src/data/pageMeta.json` | 新規。`/gachacho` の title / description / og:title / og:image を一元定義（ビルド時の静的 HTML と実行時の `document.title` の両方が参照） |
| `scripts/generate-page-html.mjs` | 新規。`dist/index.html` を元に `<title>`・description・OGP ブロック・canonical だけを差し替え、`dist/pages/gachacho.html` を書き出す。script / link（ハッシュ付き chunk）は index.html と同一 |
| `package.json` | `build` を `tsc -b && vite build && node scripts/generate-page-html.mjs` へ |
| `public/gachacho/og-image-1.0.3.jpg` | 新規。Hero イラスト原本（`04-nature-reference.png`）を中央 1669×876 に切り出し 1200×630 へ縮小（JPEG 品質88、約114KB）。OG 画像は WebP 非対応のクローラーがあるため JPEG |
| `src/hooks/usePageTitle.ts` | 第3引数 `fullTitle` を追加（title をそのまま `document.title` にする）。既存呼び出しは変更なし |
| `src/hooks/useCanonical.ts` | 静的 HTML に同じ canonical がある場合は二重追加しない |
| `src/pages/Gachacho.tsx` | `usePageTitle(pageMeta.gachacho.title, false, true)` |
| `infrastructure/scripts/deploy.ps1` | 静的 sync の除外に `pages/*` と S3 キー `gachacho` を追加（`--delete` でページ HTML が消えないようにする）。法務JSONの後・`index.html` の前に「Upload page HTML」ステップを追加（`dist/pages/gachacho.html` → `s3://kool-co-jp-web/gachacho`、`text/html; charset=utf-8`、no-cache） |
| `infrastructure/scripts/tests/deploy.stubtest.ps1` | 呼び出し回数 5 → 6、ページ HTML の Content-Type と順序、sync の除外を検証する assert を追加 |
| `docs/DEPLOYMENT.md` | §6.1 の配布順にページ別 HTML を追加 |

### 設定した内容

| 項目 | 値 |
|---|---|
| `<title>` / `document.title` | ガチャちょう｜集めて、見せ合う。シール帳みたいなガチャコレクション帳アプリ |
| description / og:description | カプセルトイの台紙を撮ると、AIが商品情報とラインナップを読み取って、あなただけのコレクション帳に。持っているものも、ダブりも、集めた日の思い出も。友だちとお互いのアプリを開いて、好きなものを見せ合おう。株式会社SmartThanksが提供する無料アプリ。 |
| og:title / twitter:title | ガチャちょう｜集めて、見せ合う。 |
| og:image / twitter:image | `https://smartthanks.world/gachacho/og-image-1.0.3.jpg`（1200×630、`summary_large_image`） |
| og:url / canonical | `https://smartthanks.world/gachacho` |
| og:site_name / og:locale | 株式会社SmartThanks / ja_JP |

### 検証

| 項目 | 結果 |
|---|---|
| `npm run lint` / `npm run build` / `git diff --check` | exit 0。build 末尾で `generate-page-html: /gachacho -> dist/pages/gachacho.html` |
| 生成 HTML の script / stylesheet / modulepreload | `dist/index.html` と完全一致（diff なし） |
| deploy 副作用なしテスト `deploy.stubtest.ps1` | ALL PASSED（aws 6回、ページ HTML が `text/html` で `index.html` の前、sync が キー `gachacho` を除外、途中失敗で停止） |
| S3 / CloudFront を模した静的配信（`/gachacho` → `pages/gachacho.html`、それ以外は `index.html` フォールバック）でのクローラー視点（JS なし） | `/gachacho` の `<title>`・og:title・og:image がページ用。`/service`・`/gachacho/`（末尾スラッシュ）は従来どおり汎用 `index.html` |
| 同配信での実行時（React 起動後） | `document.title` が静的 HTML と同じ文字列、canonical は1本のみ、h1・バッジ（2枚）を描画 |
| OG 画像 | 200 / `image/jpeg` / 116,558B。見出し文字が切れていないことを目視 |

### 公開時の条件・残る事項

- deploy は Google Play 公開確認後に §13 とまとめて実施する。deploy 後は `curl -I https://smartthanks.world/gachacho` で `content-type: text/html; charset=utf-8` と、`curl https://smartthanks.world/gachacho | grep og:` でページ用 OGP を確認する。X / Facebook / LINE の OGP キャッシュは各ツール（Card validator 等）で更新が必要な場合がある
- `/gachacho/`（末尾スラッシュ）と他ページの OGP は汎用のまま。ページを増やす場合は `pageMeta.json` に追加し、`deploy.ps1` の Upload page HTML に対応するキーの `aws s3 cp` を足す
- サイト共通の `og-image.webp`（トップ用）は従来どおり未作成（CLAUDE.md の既知課題）
- 旧 tag（`deploy/20260909-t072` 以前）へ rollback する場合、旧 `deploy.ps1` の sync `--delete` は除外設定を持たないため S3 のキー `gachacho` を削除し、`/gachacho` は `index.html` フォールバック（汎用 OGP）に戻る。表示自体は壊れない

## 15. 公開工程 第2回（2026-09-10）: Google Play バッジ・Service/Footer 表記・ページ別 OGP

### 公開直前の照合

| 項目 | 結果 |
|---|---|
| Google Play `jp.co.kool.gachacho` | ユーザーから公開の連絡。`https://play.google.com/store/apps/details?id=jp.co.kool.gachacho` が **HTTP 200**（前日は 404） |
| ブランチ | `origin/main` との差は空のマージコミット2件のみ。main の取り込み不要 |
| ローカル検証 | §13・§14 のとおり（lint / build / diff --check / stub テスト ALL PASSED） |

### 実施内容

| # | 手順 | 結果 |
|---|---|---|
| 1 | `git commit` `b5d232a`「feat: ガチャちょうLPにGoogle Playバッジとページ別OGPを追加（T-072）」→ `git push` | `e76c595..b5d232a` |
| 2 | `.\infrastructure\scripts\deploy.ps1` | Build（`generate-page-html: /gachacho -> dist/pages/gachacho.html`）→ assets → 静的ファイル（`google-play-badge-jp.svg`・`og-image-1.0.3.jpg` を新規配置）→ 法務JSON → **Upload page HTML**（`dist/pages/gachacho.html` → `s3://kool-co-jp-web/gachacho`）→ `index.html` → Invalidation `I8G85833HSFFEVFIHA18RVE6L5`。`Deployment complete!` |
| 3 | deploy tag | `deploy/20260910-t072-android-ogp` を `b5d232a` に付与し push |

補足: 初回の deploy 実行は出力を絞る `Select-String` の正規表現が不正で PowerShell がパイプライン構築時に失敗し、`deploy.ps1` 自体は実行されなかった（AWS 呼び出しなし）。ログをファイルへ出す形で再実行した。

### 公開後確認（Invalidation `Completed` 後、`Cache-Control: no-cache`）

| URL | 結果 |
|---|---|
| `/gachacho` | 200、`text/html; charset=utf-8`（4472B、S3 キー `gachacho`）。`<title>` がページ用、og:title「ガチャちょう｜集めて、見せ合う。」、og:image `og-image-1.0.3.jpg`、twitter:card `summary_large_image`、canonical `/gachacho` |
| `/`・`/service`・`/gachacho/`・`/gachacho/terms` | 200、従来どおり汎用 `index.html`（`<title>株式会社SmartThanks</title>`） |
| `/gachacho` と `/` が参照する chunk | 完全一致（ページ HTML と index.html は同じビルド） |
| `/gachacho/og-image-1.0.3.jpg` | 200、`image/jpeg`、116,558B |
| `/gachacho/google-play-badge-jp.svg` | 200、`image/svg+xml`、13,431B |
| `/gachacho/legal/current.json` | 200、`application/json; charset=utf-8`（変更なし） |
| Gachacho chunk / Service chunk | Play ストア URL、「iOS/Androidアプリ公開中」を含む |
| 本番描画（headless Chrome） | `/gachacho` 1440 / 390 で横スクロールなし、Hero 下に App Store / Google Play バッジが並ぶ。`/service` 390 で「iOS/Androidアプリ公開中」1行。`production2_1440_full.webp`、`production2_1440_hero.webp`、`production2_390_full.webp`、`production2_service_390.webp` |

### 残る事項

- X / Facebook / LINE 側で以前の OGP がキャッシュされている場合は、各サービスのデバッガーで再取得が必要
- 実機（iOS Safari / Android Chrome）での本番確認は未実施
- rollback: `deploy/20260909-t072` へ checkout して `deploy.ps1` を実行すると、旧スクリプトの sync `--delete` が S3 キー `gachacho` を削除し、`/gachacho` は `index.html` フォールバック（汎用 OGP、Android 準備中表記）へ戻る。互換性 floor（規約URL・法務JSON）は維持される
- T-072 / UT-046 の完了判定は CapCole 側の Codex 判断に委ねる
