import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Camera,
  FileText,
  JapaneseYen,
  Layers,
  Leaf,
  Mail,
  MapPin,
  PenLine,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
  Info,
} from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle.ts';
import useCanonical from '../hooks/useCanonical.ts';
import pageMeta from '../data/pageMeta.json';

// OAuth 同意画面・App Store と同じアプリ名。表記ゆれを起こさないため定数にする
const APP_NAME = 'ガチャちょう';
const APP_STORE_URL = 'https://apps.apple.com/jp/app/id6798359468';
// Apple 公式バッジ（JP / Black lockup）。Apple のガイドラインに従い、改変せず最小高さ 40px と余白を確保して使う
const APP_STORE_BADGE = '/gachacho/app-store-badge-jp.svg';
// Google Play（Android）。公式バッジ（JP）を Google の配布 zip からそのまま使用し、改変せず Apple バッジと同じ高さで並べる
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=jp.co.kool.gachacho';
const GOOGLE_PLAY_BADGE = '/gachacho/google-play-badge-jp.svg';
// 手帳アイコン（version 1.0.3 で版付きファイルに更新）
const APP_ICON = '/gachacho/icon-1.0.3-512.webp';
// App Store 掲載画像（version 1.0.3）。ストア用の完成画像を回転・トリミングせずそのまま使う。
// 原本 1242×2688 を比率維持で 480 / 720 / 1080 幅に変換したもの。src は 720 版
const STORE_IMAGE_WIDTH = 720;
const STORE_IMAGE_HEIGHT = 1558;
const storeImage = (name: string) => ({
  src: `/gachacho/${name}-1.0.3-720.webp`,
  srcSet: [480, 720, 1080].map((w) => `/gachacho/${name}-1.0.3-${w}.webp ${w}w`).join(', '),
});

const STEPS = [
  {
    no: '01',
    title: '台紙を撮って、はじめよう。',
    body: 'ガチャの台紙を撮影するか、アルバムから選択。お気に入りのラインナップを、コレクション帳に残せます。',
    ...storeImage('store-01-capture'),
    alt: `${APP_NAME}の紹介画像。台紙を撮影してコレクション帳を作る`,
    icon: <Camera size={20} />,
  },
  {
    no: '02',
    title: 'AIが読み取り、確認して保存。',
    body: 'AIが商品名・価格・ラインナップを読み取ります。名前や切り抜きを確認し、必要に応じて直してから保存できます。',
    ...storeImage('store-02-ai-collection'),
    alt: `${APP_NAME}のAI読み取りと、保存前にラインナップを確認する画面`,
    icon: <Sparkles size={20} />,
  },
  {
    no: '03',
    title: 'シール帳みたいに、見せ合おう。',
    body: '＋で所持数を記録すると、持っているものもダブりもひと目で。友だちとお互いのアプリを開いて、「それ、持ってる！」を楽しもう。',
    ...storeImage('store-03-show-together'),
    // 上側の端末が逆向きなのは、向かい合って見せ合う構図として意図された完成素材
    alt: `向かい合って${APP_NAME}を見せ合う紹介画像。集めたアイテムと所持数が表示されている`,
    icon: <Users size={20} />,
  },
];

// Hero はユーザー指定のネイチャー調イラスト（受け渡し一式の 04 原本 1795×876 を比率維持で変換）。
// 画像内に見出しが入っているため alt にその文言を含め、HTML の h1 は別途維持する
// 余白色を純白に正規化した WebP を mix-blend-multiply で紙色に重ね、四辺をマスクで溶かす
const HERO_IMAGE = {
  src: '/gachacho/hero-nature-1.0.3-1440.webp',
  srcSet: [720, 1080, 1440, 1795].map((w) => `/gachacho/hero-nature-1.0.3-${w}.webp ${w}w`).join(', '),
  width: 1440,
  height: 703,
  alt: `生成りの机に開いた2冊の手帳へ、プリンやクロワッサンなどのガチャのチャームを貼ったイラスト。「集めて、見せ合う。シール帳みたいな、${APP_NAME}。」`,
};

const RECORDS = [
  { icon: <Plus size={18} />, label: '所持数', note: '＋でひとつずつ記録' },
  { icon: <Layers size={18} />, label: 'ダブり', note: '2個目以降も数でわかる' },
  { icon: <CalendarDays size={18} />, label: '取得日', note: '集めた日を残す' },
  { icon: <JapaneseYen size={18} />, label: '取得時の価格', note: 'そのときの金額を記録' },
  { icon: <MapPin size={18} />, label: '場所・メモ', note: '出会った場所や思い出も' },
  { icon: <PenLine size={18} />, label: '月ごとの振り返り', note: '回数と記録した金額を見返す' },
];

// 掲載画像の外装。完成画像を直立で全体表示し、細い境界とごく薄い中性色の影だけを付ける
const STORE_IMAGE_CLASS =
  'block w-full h-auto rounded-xl border border-gachacho-nature-line shadow-[0_2px_12px_rgba(48,61,54,0.08)]';
// リンクの共通スタイル。深緑・下線・キーボードフォーカス時の輪郭
const LINK_CLASS =
  'inline-block py-2 font-bold text-gachacho-nature-forest underline underline-offset-4 decoration-gachacho-nature-sage hover:decoration-gachacho-nature-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gachacho-nature-forest rounded-sm';
const BADGE_LINK_CLASS =
  'inline-block shrink-0 p-3 -m-3 rounded-lg motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gachacho-nature-forest';

// 「、」の直後だけで折り返せるようにし、見出しの末尾一文字だけが次行へ落ちないようにする。
// index.css の `* { font-main }` が span にも効くため、親（明朝など）のフォントを明示的に継承する
const Phrase = ({ text }: { text: string }) => (
  <>
    {text.split(/(?<=、)/).map((part, i) => (
      <span key={i} className="inline-block [font-family:inherit]">
        {part}
      </span>
    ))}
  </>
);

// App Store / Google Play の公式バッジ。どちらも改変せず、同じ高さ（48px / 60px）で並べる
const StoreBadges = ({ lazy = false, className = '' }: { lazy?: boolean; className?: string }) => (
  <div className={`flex flex-wrap items-center gap-x-4 gap-y-3 ${className}`}>
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={BADGE_LINK_CLASS}>
      <img
        src={APP_STORE_BADGE}
        alt="App Storeでダウンロード"
        width={163}
        height={60}
        loading={lazy ? 'lazy' : undefined}
        className="h-12 md:h-[60px] w-auto"
      />
    </a>
    <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className={BADGE_LINK_CLASS}>
      <img
        src={GOOGLE_PLAY_BADGE}
        alt="Google Playで手に入れよう"
        width={180}
        height={53}
        loading={lazy ? 'lazy' : undefined}
        className="h-12 md:h-[60px] w-auto"
      />
    </a>
  </div>
);

// 節の見出しに添える小さなラベル。葉のアイコンはセージで、装飾は文章の外側にだけ置く
const Eyebrow = ({ children }: { children: string }) => (
  <p className="flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase text-gachacho-nature-muted mb-3">
    <Leaf size={14} className="text-gachacho-nature-sage shrink-0" aria-hidden="true" />
    {children}
  </p>
);

const Gachacho = () => {
  // ビルド時に生成する静的 HTML（OGP 用）と同じタイトル。会社名よりサービス名を前に出す
  usePageTitle(pageMeta.gachacho.title, false, true);
  useCanonical('/gachacho');
  const reduceMotion = useReducedMotion();

  // prefers-reduced-motion では位置移動を伴う演出を止め、短いフェードのみにする
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: reduceMotion ? 0.2 : 0.5, delay, ease: 'easeOut' as const },
  });

  return (
    <div className="bg-gachacho-nature-paper text-gachacho-nature-ink">
      {/* ===== Hero ===== */}
      <section className="pt-24 md:pt-32 pb-14 md:pb-24">
        <div className="container">
          {/* 見出し・副見出しは画像内の文言と重複するため視覚的には出さず、読み上げ・検索向けのHTMLテキストとして残す */}
          <h1 className="sr-only">集めて、見せ合う。</h1>
          <p className="sr-only">シール帳みたいな、{APP_NAME}。</p>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.6 }}
          >
            <img
              src={HERO_IMAGE.src}
              srcSet={HERO_IMAGE.srcSet}
              sizes="(min-width: 1280px) 1120px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
              alt={HERO_IMAGE.alt}
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              fetchPriority="high"
              className="gachacho-hero-fade block w-full h-auto mix-blend-multiply"
            />
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto mt-6 md:mt-10 text-center"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <img
                src={APP_ICON}
                alt=""
                width={64}
                height={64}
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-gachacho-nature-line shrink-0"
              />
              <div className="text-left min-w-0 [overflow-wrap:anywhere]">
                <p className="text-sm font-bold tracking-[0.15em] uppercase text-gachacho-nature-muted leading-snug">
                  iOS / Android App by SmartThanks
                </p>
                <p className="font-rounded font-bold text-2xl md:text-3xl leading-tight text-gachacho-nature-forest">
                  {APP_NAME}
                </p>
              </div>
            </div>

            <p className="text-base md:text-lg leading-[1.8] text-left md:text-center mb-8">
              {'カプセルトイの台紙を撮ると、AIが商品情報とラインナップを読み取って、あなただけのコレクション帳に。' +
                '持っているものも、ダブりも、集めた日の思い出も。友だちとお互いのアプリを開いて、好きなものを見せ合おう。'}
            </p>

            <div className="flex flex-col items-start md:items-center gap-4">
              <StoreBadges className="justify-start md:justify-center" />
              <p className="text-sm text-gachacho-nature-muted leading-relaxed text-left md:text-center">
                iPhone / Android向けに配信中（無料）。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 使い方3つ ===== */}
      <section className="py-14 md:py-24 bg-gachacho-nature-surface border-y border-gachacho-nature-line">
        <div className="container">
          <motion.div {...reveal()} className="mb-12 md:mb-16">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-rounded font-bold text-2xl md:text-4xl leading-snug text-gachacho-nature-forest">
              <Phrase text="撮って、集めて、見せ合おう。" />
            </h2>
          </motion.div>

          <div className="space-y-14 md:space-y-24">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.no}
                {...reveal()}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* DOM は番号・見出し・本文 → 画像。PC では 01 / 03 の画像を左に置き、02 だけ左右を入れ替える */}
                <div className={`md:col-span-7 ${i % 2 === 0 ? 'md:order-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-gachacho-display font-semibold text-4xl md:text-5xl text-gachacho-nature-blue leading-none">
                      {step.no}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-gachacho-nature-sage-soft text-gachacho-nature-forest flex items-center justify-center">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="font-rounded font-bold text-xl md:text-3xl mb-4 leading-snug text-gachacho-nature-forest">
                    <Phrase text={step.title} />
                  </h3>
                  <p className="text-base md:text-lg leading-[1.8]">{step.body}</p>
                </div>
                <div className={`md:col-span-5 flex justify-center ${i % 2 === 0 ? 'md:order-1' : ''}`}>
                  <div className="w-full max-w-[260px] md:max-w-[280px]">
                    <img
                      src={step.src}
                      srcSet={step.srcSet}
                      sizes="(min-width: 768px) 280px, (min-width: 300px) 260px, calc(100vw - 40px)"
                      alt={step.alt}
                      width={STORE_IMAGE_WIDTH}
                      height={STORE_IMAGE_HEIGHT}
                      loading="lazy"
                      className={STORE_IMAGE_CLASS}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 記録できること（手帳ページ） ===== */}
      <section className="py-14 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div {...reveal()} className="lg:col-span-5">
              <Eyebrow>What you can keep</Eyebrow>
              <h2 className="font-rounded font-bold text-2xl md:text-4xl leading-snug mb-6 text-gachacho-nature-forest">
                <Phrase text="集めた日も、思い出のひとつ。" />
              </h2>
              <p className="text-base md:text-lg leading-[1.8]">
                いつ、どこで、何を集めたか。場所やメモと一緒に残して、日付ごとのリストや月ごとの記録で振り返れます。
              </p>
            </motion.div>

            {/* 罫線入りのノートページ */}
            <motion.div
              {...reveal(0.1)}
              className="lg:col-span-7 relative bg-gachacho-nature-surface rounded-r-2xl rounded-l-md border border-gachacho-nature-line shadow-[0_2px_12px_rgba(48,61,54,0.06)]"
            >
              {/* リングノートの綴じ穴 */}
              <div aria-hidden="true" className="absolute left-3 top-0 bottom-0 flex flex-col justify-around py-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="w-3 h-3 rounded-full bg-gachacho-nature-paper border border-gachacho-nature-line" />
                ))}
              </div>
              <ul className="pl-10 pr-5 md:pl-14 md:pr-8 py-2 md:py-4 divide-y divide-gachacho-nature-line">
                {RECORDS.map((r) => (
                  <li key={r.label} className="flex items-start gap-4 py-4">
                    <span className="w-9 h-9 rounded-lg bg-gachacho-nature-sage-soft text-gachacho-nature-forest flex items-center justify-center shrink-0">
                      {r.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-rounded font-bold text-base md:text-lg leading-snug text-gachacho-nature-forest">
                        {r.label}
                      </p>
                      <p className="text-sm md:text-base text-gachacho-nature-muted leading-relaxed">{r.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== AIについての注意（付箋） ===== */}
      <section className="pb-14 md:pb-24">
        <div className="container">
          <motion.div
            {...reveal()}
            className="relative max-w-3xl mx-auto bg-gachacho-nature-sage-soft border border-gachacho-nature-line rounded-lg p-6 md:p-8"
          >
            {/* 紙のテープ。節の端に1箇所だけ */}
            <span aria-hidden="true" className="absolute -top-2.5 left-8 w-16 h-5 bg-gachacho-nature-sage/70 rounded-sm" />
            <div className="flex items-start gap-4">
              <Info size={22} className="text-gachacho-nature-forest shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h2 className="font-rounded font-bold text-lg md:text-xl mb-2 text-gachacho-nature-forest">
                  AIの読み取りについて
                </h2>
                <p className="text-sm md:text-base leading-[1.8]">
                  {'台紙の読み取りはAIによる推定のため、商品名・価格・種類数・アイテム名などを誤ることがあります。' +
                    '読み取り結果は保存前の確認画面で見直し、修正できます。AI解析は1ユーザーにつき1日10回までです。'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 運営者・お問い合わせ・法務 ===== */}
      <section className="py-14 md:py-24 bg-gachacho-nature-surface border-t border-gachacho-nature-line">
        <div className="container">
          <motion.div {...reveal()} className="max-w-3xl mx-auto">
            <Eyebrow>Information</Eyebrow>
            <h2 className="font-rounded font-bold text-2xl md:text-3xl leading-snug mb-8 text-gachacho-nature-forest">
              運営者・お問い合わせ・規約
            </h2>

            <dl className="divide-y divide-gachacho-nature-line border-y border-gachacho-nature-line">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-nature-muted">
                  <Building2 size={16} aria-hidden="true" /> 運営者
                </dt>
                <dd className="sm:col-span-8">
                  <Link to="/company" className={LINK_CLASS}>
                    株式会社SmartThanks
                  </Link>
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-nature-muted">
                  <Sparkles size={16} aria-hidden="true" /> アプリ名
                </dt>
                <dd className="sm:col-span-8 font-bold">{APP_NAME}</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-nature-muted">
                  <ArrowRight size={16} aria-hidden="true" /> 配信
                </dt>
                <dd className="sm:col-span-8">
                  <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={`${LINK_CLASS} break-all`}>
                    App Store（iPhone）
                  </a>
                  <span className="block">
                    <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className={`${LINK_CLASS} break-all`}>
                      Google Play（Android）
                    </a>
                  </span>
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-nature-muted">
                  <Mail size={16} aria-hidden="true" /> お問い合わせ
                </dt>
                <dd className="sm:col-span-8">
                  <Link to="/contact?type=gachacho" className={LINK_CLASS}>
                    お問い合わせフォーム
                  </Link>
                  <span className="block text-sm text-gachacho-nature-muted mt-1">使い方・不具合・データの取扱いについて</span>
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-nature-muted">
                  <FileText size={16} aria-hidden="true" /> 利用規約
                </dt>
                <dd className="sm:col-span-8">
                  <Link to="/gachacho/terms" className={LINK_CLASS}>
                    {APP_NAME} 利用規約
                  </Link>
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-nature-muted">
                  <ShieldCheck size={16} aria-hidden="true" /> プライバシー
                </dt>
                <dd className="sm:col-span-8">
                  <Link to="/privacy#gachacho" className={LINK_CLASS}>
                    プライバシーポリシー（{APP_NAME}に関する個別の取扱い）
                  </Link>
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* ===== 最後のCTA ===== */}
      <section className="py-16 md:py-24 bg-gachacho-nature-sage-soft border-t border-gachacho-nature-line">
        <div className="container">
          <motion.div {...reveal()} className="max-w-2xl mx-auto text-center">
            <img
              src={APP_ICON}
              alt=""
              width={80}
              height={80}
              loading="lazy"
              className="w-20 h-20 rounded-[1.25rem] border border-gachacho-nature-line mx-auto mb-6"
            />
            <h2 className="font-gachacho-display font-semibold text-[26px] md:text-4xl leading-[1.4] tracking-wide text-gachacho-nature-forest mb-4">
              <Phrase text="今日のひとつを、見せたい一冊に。" />
            </h2>
            <p className="text-base md:text-lg leading-[1.8] mb-8">
              {APP_NAME}で、集める時間も、見せ合う時間も楽しもう。
            </p>
            <StoreBadges lazy className="justify-center" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gachacho;
