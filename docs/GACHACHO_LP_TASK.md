# ガチャちょう公式LP 実装指示（T-059）

作成日: 2026-09-04
担当リポジトリ: `C:\Users\user\AIProjects\SmartThanksCorporate`
関連プロジェクト: `C:\Users\user\AIProjects\CapCole`
状態: ローカル実装・レビュー待ち（本番deploy未承認）

## 目的

Google Auth PlatformのOAuth同意画面に表示するアプリ名「ガチャちょう」を、同一ドメインの公式ページで確認できるようにする。あわせて、利用者向けの製品紹介、App Store、問い合わせ、利用規約、プライバシーポリシーへの正式な入口を整える。

## 正本と責任境界

- 企業サイトの実装・デザイン・ルーティング・デプロイ手順の正本は、この`SmartThanksCorporate`リポジトリと`CLAUDE.md`
- ガチャちょうの機能、公開状況、法務本文、公開URL、T-059のリリースゲートの正本は、CapColeの`TASKS.md`、`docs/PRODUCT_SPEC.md`、`docs/TERMS_AND_PRIVACY.md`、`docs/RELEASE_OPERATIONS.md`
- SmartThanksCorporate側のClaude CodeはCapColeのアプリ・backend・仕様書を変更しない
- CapCole側で生成された法務成果物を参照・取り込む場合も、本文をSmartThanksCorporate側で独自に書き換えない

## 実装対象

### 1. 公式LP

- URL: `https://smartthanks.world/gachacho`
- `src/pages/Gachacho.tsx`を追加し、`src/App.tsx`から既存方針どおりlazy loadする
- ページタイトルと本文に、OAuth同意画面と同じアプリ名「ガチャちょう」を文字として明記する
- 少なくとも次を掲載する
  - カプセルトイの台紙を撮影・選択すると、AIが商品情報とラインナップを読み取ってコレクション帳を作成するアプリであること
  - 所持アイテム、重複、取得日、取得時価格、場所・メモ、月ごとの振り返りを管理できること
  - AIの読み取り結果は誤る場合があり、保存前に確認・修正できること
  - 運営者: 株式会社SmartThanks
  - 問い合わせ: `/contact?type=gachacho`
  - 利用規約: `/gachacho/terms`
  - プライバシーポリシー: `/privacy#gachacho`
- App Store CTAは`https://apps.apple.com/jp/app/id6798359468`へリンクする
- AndroidはGoogle Play内部テスト段階で一般公開されていない。Google Play CTA、バッジ、「Androidで配信中」等の誤認表示を置かない

### 2. LPデザイン

- コーポレートサイトのNavbar / Footer / Tailwindトークン / レスポンシブ設計を維持し、別サイトに見えないこと
- 一方で製品部分は、ガチャちょうの「大学生くらいの女性向け・大人かわいい」「手帳＋ガチャガチャ」の個性が分かるデザインにする
- 紫青グラデーション、すべてを同じ角丸カードにする構成、意味のないピルや弱い影の反復など、汎用AIテンプレート風の表現を避ける
- App Store用の既存画像を優先的に再利用する。参照元:
  - `C:\Users\user\AIProjects\CapCole\design\store\app-store\ja\6.5-inch\01-photo-ai.png`
  - `C:\Users\user\AIProjects\CapCole\design\store\app-store\ja\6.5-inch\02-check-items.png`
  - `C:\Users\user\AIProjects\CapCole\design\store\app-store\ja\6.5-inch\03-show-together.png`
  - アプリアイコンは`C:\Users\user\AIProjects\CapCole\design\derived\app-icon\icon.png`
- 必要な画像はWeb向けに適切な寸法・形式へ変換して`public/gachacho/`へ置き、元のCapColeファイルは変更しない
- モバイルを主対象とし、320px級からデスクトップまで横スクロール、文字切れ、過大画像がないこと
- motionは内容理解を妨げず、`prefers-reduced-motion`を尊重する

### 3. `/service`からの導線

- 「自社プロダクト開発・R&D」内に、現在公開中の自社プロダクトとしてガチャちょうを明示する
- 単なる箇条書き追加ではなく、名称・短い説明・公式LPへの内部リンクが判別できる構造にする
- 既存の事業問い合わせCTAは維持する

### 4. 利用規約ページと法務配信

- 公開利用規約URLは`https://smartthanks.world/gachacho/terms`
- ルート直下の`/terms`に本文ページは作らない。ただし公開中のiOS version `1.0.1` / build `9`が旧URLを参照するため、`/terms`から`/gachacho/terms`への後方互換リダイレクトを設ける
- リダイレクトはクエリとハッシュを不要に破壊せず、検索エンジン上のcanonicalは`/gachacho/terms`とする。React Routerのクライアント遷移だけでなく、本番の直接アクセスでも到達できる構成を確認する
- `/gachacho/terms`はCapColeの確定法務本文を表示する。URL訂正版は文書版1.0.1、制定日2026-08-31、最終更新日2026-09-04とし、文書版1.1がCapColeで確定した場合はその成果物へ同期する
- プライバシーポリシーの公開URLは既存の`https://smartthanks.world/privacy`を維持する
- 次の法務JSONを同じURL構造で静的配信できるようにする
  - `/gachacho/legal/current.json`
  - `/gachacho/legal/versions/1.0.json`
  - `/gachacho/legal/versions/1.0.1.json`
  - 文書版1.1確定後は`versions/1.1.json`
- `public/sitemap.xml`へ`/gachacho`と`/gachacho/terms`を追加する

## 実装してはいけないこと

- `infrastructure/scripts/deploy.ps1`を実行しない
- AWS S3、CloudFront、Route 53へ書き込まない
- Google Auth Platformの設定・確認申請を変更しない
- Firebase、Apple Developer、Google Play、App Store Connectを変更しない
- CapColeのアプリ、backend、Rules、version / buildを変更しない
- 未追跡の`.claude/`へ触れない、削除しない、commitしない
- 文書版1.1の法務文言を推測で作らない

## 検証

- `npm run lint`
- `npm run build`
- ローカル表示で`/gachacho`、`/gachacho/terms`、`/service`、`/privacy#gachacho`、`/contact?type=gachacho`を確認する
- 旧`/terms`への直接アクセスが`/gachacho/terms`へ到達し、本文を二重管理していないことを確認する
- LPから各リンクへ到達でき、404にならないことを確認する
- App Store CTAのリンク先が`id6798359468`であることを確認する
- Google Playの公開CTAがないことを確認する
- モバイル・デスクトップの主要幅で視覚確認し、スクリーンショットをレビュー記録へ添える
- `git diff --check`

## 提出物

- 実装差分
- 検証結果と視覚確認結果
- 公開時に変更されるS3オブジェクトとCloudFront対象の要約
- 問題発生時のrollback手順
- Claude Codeレビューmd。`reviews/Claude Code/20260904_T059_smartthankscorporate_review.md`を作成する
- `feature/gachacho-privacy-support`へcommit / pushする。ただし本番deployは行わない

## 完了後の停止位置

commit / pushとレビューmd提出後に停止する。Codexが差分と表示をレビューし、ユーザーがサイトdeployを個別承認するまでは公開しない。公開後も、Googleブランディング再申請は別のユーザー操作として扱う。
