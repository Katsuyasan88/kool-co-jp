# CLAUDE.md — SmartThanks Corporate Site

AIへの指示を行う際のコンテキストファイルです。このファイルを読んでからコードを触ってください。

## プロジェクト概要

株式会社SmartThanks（旧 株式会社くうる）のコーポレートサイト。
- **URL**: https://smartthanks.world
- **旧ドメイン**: https://kool.co.jp（301リダイレクト → smartthanks.world）
- **目的**: 自社サービス紹介、新規事業支援の受注、採用・問い合わせ導線

## 技術スタック

| 種別 | ライブラリ/ツール |
|------|-----------------|
| UI フレームワーク | React 19 + TypeScript |
| ルーティング | React Router DOM v7 |
| スタイリング | Tailwind CSS v3（PostCSS 経由） |
| アニメーション | Framer Motion |
| アイコン | Lucide React |
| ビルド | Vite |
| ホスティング | AWS S3 + CloudFront |
| バックエンド | AWS Lambda + API Gateway（お問い合わせフォームのみ） |
| DNS | AWS Route 53 |

> **注意**: `@tailwindcss/vite` は `package.json` から削除済み。Tailwind は PostCSS 経由（`tailwind.config.js` + `postcss.config.js`）で動作している。Tailwind v4 系への移行は行っていない。

## ディレクトリ構成

```
src/
├── App.tsx              # ルーター定義・レイアウトシェル
├── main.tsx             # React エントリーポイント
├── index.css            # グローバルスタイル・ユーティリティクラス定義
├── components/
│   ├── Navbar.tsx       # 固定ヘッダー・モバイルメニュー
│   ├── Footer.tsx       # フッター
│   ├── Loading.tsx      # ページ遷移スピナー
│   └── ScrollToTop.tsx  # ルート変更時に scroll(0,0)
├── pages/
│   ├── Home.tsx         # トップページ（各セクションを lazy import）
│   ├── Company.tsx      # 会社概要
│   ├── Service.tsx      # サービス詳細
│   ├── News.tsx         # ニュース一覧
│   ├── Contact.tsx      # お問い合わせフォーム
│   ├── Privacy.tsx      # プライバシーポリシー
│   ├── Legal.tsx        # 特定商取引法に基づく表記
│   ├── NotFound.tsx     # 404 ページ
│   └── home/            # Home ページの各セクションコンポーネント
│       ├── Hero.tsx
│       ├── ServicesSection.tsx
│       ├── Achievements.tsx
│       ├── Vision.tsx
│       ├── NewsSection.tsx
│       └── CTASection.tsx
├── hooks/
│   └── usePageTitle.ts  # ページタイトル動的変更
└── data/
    └── news.json        # ニュースデータ（静的 JSON）
```

```
infrastructure/
├── lambda/              # お問い合わせフォーム Lambda 関数（Node.js）
├── scripts/
│   └── deploy.ps1       # ビルド → S3 同期 → CloudFront Invalidation
└── *.json               # AWS リソース設定スナップショット
docs/
└── DEPLOYMENT.md        # デプロイ・ドメイン移行手順
public/
├── logo.webp
├── hero-bg.webp
├── founder.webp
└── og-image.webp        # ★未作成（SNS シェア用。1200×630px で作成すること）
```

## デザインシステム

`tailwind.config.js` でカスタムトークンを定義。変更は必ずこのファイルに対して行い、インラインで `#f59e0b` のような生の色値を使わないこと。

| トークン | 値 | 用途 |
|---------|-----|------|
| `primary` | `#F59E0B` | メインカラー（アンバー） |
| `primary.dark` | `#B45309` | ホバー状態など |
| `secondary` | `#FDE68A` | アクセント（ライトゴールド） |
| `accent` | `#D97706` | 補助カラー |
| `text-main` | `#393939` | 本文テキスト |
| `text-muted` | `#64748b` | サブテキスト |
| `bg-soft` | `#f8fafc` | セクション背景 |
| `border` | `#e2e8f0` | ボーダー |

### 共通ユーティリティクラス（`src/index.css`）

| クラス | 説明 |
|--------|------|
| `.container` | `max-w-[1200px] mx-auto px-6 md:px-10` |
| `.section` | `py-10 md:py-20` |
| `.gradient-text` | primary → secondary グラデーションテキスト |
| `.glass-effect` | 半透明白背景 + backdrop-blur（Navbar スクロール後） |
| `.btn` | ボタン基底スタイル |
| `.btn-primary` | グラデーション塗りつぶしボタン |
| `.btn-outline` | アウトラインボタン |
| `.circle-blob` | 装飾用のぼかし円 |

## コーディング規約

- **コンポーネント**: 関数コンポーネント + TypeScript。`React.FC` 型注釈は不要。
- **スタイル**: Tailwind クラスのみ。CSS-in-JS や styled-components は使わない。
- **アニメーション**: Framer Motion を使う。CSS アニメーションは `tailwind.config.js` の `animation` か `index.css` の `@keyframes` に定義する。
- **ページタイトル**: 各ページで `usePageTitle("タイトル")` を呼ぶ。トップページは `usePageTitle("", true)` でサイト名のみ表示。
- **画像フォーマット**: WebP を優先。`alt` は装飾用なら空文字 `alt=""`。
- **ルーティング**: `<Link>` / `useNavigate` を使う。`<a href>` で内部遷移しない。
- **新規ページ追加時**: `src/pages/` にファイル作成 → `App.tsx` に lazy import + Route 追加。

## パフォーマンス設計

- Hero セクションは **eager import**（LCP 最優先）
- それ以外のホームセクション・全ページは **React.lazy + Suspense** で遅延読み込み
- Vite の `manualChunks` で vendor ライブラリを分割（react 系・framer-motion+lucide 系）
- `hero-bg.webp` は `index.html` で `<link rel="preload">` 済み（デスクトップのみ）

## お問い合わせフォーム

- エンドポイント: `https://b2vrcx3tx1.execute-api.ap-northeast-1.amazonaws.com/prod/contact`
- Lambda が受け取り → Slack Webhook に通知する構成
- フロントは `fetch` で POST するだけ。バックエンドロジックは `infrastructure/lambda/` を参照
- エンドポイント URL はクライアントサイドにハードコードされているため、公開情報として扱う（レート制限は Lambda 側で対応）

## デプロイ

```powershell
.\infrastructure\scripts\deploy.ps1
```

`npm run build` → S3 sync → CloudFront Invalidation を自動実行。詳細は `docs/DEPLOYMENT.md` 参照。

## よくある作業パターン

### ニュースを追加する
`src/data/news.json` に追記する。フォーマットは既存エントリを参照。

### 新しいサービスカードを追加する
`src/pages/home/ServicesSection.tsx` の配列を編集する。

### ページを新規追加する
1. `src/pages/NewPage.tsx` を作成（`usePageTitle` を忘れずに呼ぶ）
2. `src/App.tsx` で lazy import して `<Route>` に追加
3. Navbar や Footer のリンク一覧を更新する
4. `public/sitemap.xml` に `<url>` エントリを追加する

### OGP 画像を作成する
`public/og-image.webp` を 1200×630px で作成して配置する（現在未作成）。

## 既知の課題・TODO

- [ ] `public/og-image.webp` 未作成（SNS シェア時にサムネイルが出ない）
- [ ] `src/data/news.json` が静的。CMS 連携は未実装
- [ ] Error Boundary 未実装（コンポーネントのクラッシュ時に白画面になる可能性がある）
- [ ] お問い合わせフォームのクライアントサイドバリデーション（入力値の形式チェック等）は HTML5 の `required` のみ
