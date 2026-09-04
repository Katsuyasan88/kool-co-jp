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
  Mail,
  MapPin,
  PenLine,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle.ts';
import useCanonical from '../hooks/useCanonical.ts';

// OAuth 同意画面・App Store と同じアプリ名。表記ゆれを起こさないため定数にする
const APP_NAME = 'ガチャちょう';
const APP_STORE_URL = 'https://apps.apple.com/jp/app/id6798359468';

const STEPS = [
  {
    no: '01',
    title: '台紙を撮る',
    lead: '写真を撮るだけ。',
    body: 'ガチャガチャの台紙を撮影するか、カメラロールから選ぶだけ。AIが商品名・価格・ラインナップを読み取って、コレクション帳のページをつくります。',
    image: '/gachacho/screen-photo-ai.webp',
    alt: `${APP_NAME}で台紙を読み取り、ラインナップが並んだコレクション帳の画面`,
    icon: <Camera size={20} />,
  },
  {
    no: '02',
    title: '持っているものにチェック',
    lead: '外出先でも、すぐわかる。',
    body: 'アイテムをタップして所持数を記録。ダブりも一目でわかるので、お店の前で「これ持ってたっけ？」がなくなります。',
    image: '/gachacho/screen-check-items.webp',
    alt: `${APP_NAME}のコレクション画面で、所持アイテムと所持数を確認している様子`,
    icon: <Layers size={20} />,
  },
  {
    no: '03',
    title: 'ならべて、見せ合う',
    lead: 'シール帳みたいに。',
    body: '推しのラインナップを手帳のように眺めたり、友だちとその場で見せ合ったり。取得日や場所のメモも一緒に残せます。',
    image: '/gachacho/screen-show-together.webp',
    alt: `${APP_NAME}のコレクション帳を2台のiPhoneで見せ合っている様子`,
    icon: <Sparkles size={20} />,
  },
];

const RECORDS = [
  { icon: <Layers size={18} />, label: '所持アイテム', note: 'タップで所持数を記録' },
  { icon: <Sparkles size={18} />, label: 'ダブり（重複）', note: '2個目以降も数で管理' },
  { icon: <CalendarDays size={18} />, label: '取得日', note: 'いつ引いたかを残す' },
  { icon: <JapaneseYen size={18} />, label: '取得時の価格', note: '1回いくらだったか' },
  { icon: <MapPin size={18} />, label: '場所・メモ', note: 'どこで引いたか、思い出を一言' },
  { icon: <PenLine size={18} />, label: '月ごとの振り返り', note: 'カレンダーで月ごとに見返す' },
];

const Gachacho = () => {
  usePageTitle(APP_NAME);
  useCanonical('/gachacho');
  const reduceMotion = useReducedMotion();

  // prefers-reduced-motion では位置移動を伴う演出を止め、フェードのみにする
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: reduceMotion ? 0.2 : 0.6, delay, ease: 'easeOut' as const },
  });

  return (
    <div className="bg-gachacho-paper text-gachacho-ink overflow-x-hidden">
      {/* ===== Hero ===== */}
      <section className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        {/* 水彩風の淡いにじみ。装飾のみ */}
        <div aria-hidden="true" className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-gachacho-blush blur-3xl opacity-80" />
          <div className="absolute top-1/3 -right-32 w-[360px] h-[360px] rounded-full bg-gachacho-rose/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[280px] h-[280px] rounded-full bg-gachacho-gold/15 blur-3xl" />
        </div>

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/gachacho/icon-512.webp"
                  alt=""
                  width={64}
                  height={64}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-md shadow-gachacho-rose/30 shrink-0"
                />
                <div>
                  <p className="text-xs font-bold tracking-[0.25em] uppercase text-gachacho-rose-deep">
                    iOS App by SmartThanks
                  </p>
                  <p className="font-rounded font-bold text-2xl md:text-3xl leading-tight">{APP_NAME}</p>
                </div>
              </div>

              <h1 className="font-rounded font-bold text-3xl sm:text-4xl lg:text-5xl leading-snug md:leading-snug mb-6">
                ガチャガチャの思い出を、
                <br />
                <span className="text-gachacho-rose-deep">手帳みたいに</span>残そう。
              </h1>
              <p className="text-base md:text-lg leading-relaxed md:leading-loose text-gachacho-ink/80 max-w-xl mb-8">
                「{APP_NAME}」は、カプセルトイの台紙を撮影・選択すると、AIが商品情報とラインナップを読み取ってコレクション帳をつくるアプリです。
                持っているもの、ダブり、引いた日と価格、場所やメモまで、ぜんぶ1冊に。
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-gachacho-ink text-white shadow-lg shadow-gachacho-ink/20 hover:-translate-y-0.5 hover:shadow-xl inline-flex items-center justify-center gap-2 text-center whitespace-nowrap shrink-0"
                >
                  App Storeでダウンロード
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <p className="text-sm text-gachacho-mute leading-relaxed">
                  iPhone向けに配信中（無料）。
                  <br className="sm:hidden" />
                  Android版は準備中です。
                </p>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 30, rotate: reduceMotion ? -3 : 0 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.8, delay: 0.15 }}
            >
              <div className="relative w-[240px] sm:w-[280px] md:w-[320px]">
                {/* マスキングテープ風の装飾 */}
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-[-6deg] w-28 h-7 bg-gachacho-gold/50 backdrop-blur-sm z-10 rounded-sm"
                />
                <img
                  src="/gachacho/screen-photo-ai.webp"
                  alt={STEPS[0].alt}
                  width={720}
                  height={1255}
                  fetchPriority="high"
                  className="w-full h-auto rounded-[2rem] shadow-2xl shadow-gachacho-rose/30 border-4 border-white"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 3 Steps ===== */}
      <section className="section bg-white">
        <div className="container">
          <motion.div {...reveal()} className="mb-12 md:mb-16">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gachacho-rose-deep mb-3">How it works</p>
            <h2 className="font-rounded font-bold text-2xl md:text-4xl leading-snug">
              撮って、チェックして、ならべる。
            </h2>
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.no}
                {...reveal()}
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="md:col-span-5 flex justify-center">
                  <div className={`relative w-[220px] sm:w-[260px] ${i % 2 === 1 ? 'rotate-2' : '-rotate-2'}`}>
                    <img
                      src={step.image}
                      alt={step.alt}
                      width={720}
                      height={1255}
                      loading="lazy"
                      className="w-full h-auto rounded-[1.75rem] shadow-xl shadow-gachacho-rose/20 border-4 border-white"
                    />
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-rounded font-bold text-4xl md:text-5xl text-gachacho-rose/60 leading-none">
                      {step.no}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-gachacho-blush text-gachacho-rose-deep flex items-center justify-center">
                      {step.icon}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gachacho-rose-deep mb-2">{step.lead}</p>
                  <h3 className="font-rounded font-bold text-xl md:text-3xl mb-4 leading-snug">{step.title}</h3>
                  <p className="text-base md:text-lg leading-relaxed md:leading-loose text-gachacho-ink/80">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 記録できること（手帳ページ） ===== */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div {...reveal()} className="lg:col-span-5">
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-gachacho-rose-deep mb-3">What you can keep</p>
              <h2 className="font-rounded font-bold text-2xl md:text-4xl leading-snug mb-6">
                1冊に、ぜんぶ残る。
              </h2>
              <p className="text-base md:text-lg leading-relaxed md:leading-loose text-gachacho-ink/80">
                コレクションの「持ってる・持ってない」だけでなく、いつ・どこで・いくらで引いたかまで。
                月ごとに見返せるので、推し活の記録帳としても使えます。
              </p>
            </motion.div>

            {/* 罫線入りのノートページ */}
            <motion.div
              {...reveal(0.1)}
              className="lg:col-span-7 relative bg-white rounded-r-3xl rounded-l-md shadow-xl shadow-gachacho-rose/10 border border-gachacho-line overflow-hidden"
            >
              {/* リングノートの綴じ穴 */}
              <div aria-hidden="true" className="absolute left-3 top-0 bottom-0 flex flex-col justify-around py-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="w-3 h-3 rounded-full bg-gachacho-paper border border-gachacho-line" />
                ))}
              </div>
              <ul className="pl-10 pr-5 md:pl-14 md:pr-8 py-6 md:py-8 bg-origin-content bg-[repeating-linear-gradient(transparent_0_63px,theme(colors.gachacho.line)_63px_64px)]">
                {RECORDS.map((r) => (
                  <li key={r.label} className="flex items-center gap-4 h-16">
                    <span className="w-9 h-9 rounded-lg bg-gachacho-blush text-gachacho-rose-deep flex items-center justify-center shrink-0">
                      {r.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-rounded font-bold text-base md:text-lg leading-tight">{r.label}</p>
                      <p className="text-xs md:text-sm text-gachacho-mute leading-tight truncate">{r.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== AIについての注意（付箋） ===== */}
      <section className="pb-10 md:pb-20">
        <div className="container">
          <motion.div
            {...reveal()}
            className="relative max-w-3xl mx-auto bg-gachacho-gold/15 border border-gachacho-gold/40 rounded-sm p-6 md:p-8 rotate-[-0.5deg]"
          >
            <span
              aria-hidden="true"
              className="absolute -top-3 left-8 w-20 h-6 bg-gachacho-rose/40 rotate-[-4deg] rounded-sm"
            />
            <div className="flex items-start gap-4">
              <Info size={22} className="text-gachacho-rose-deep shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h2 className="font-rounded font-bold text-lg md:text-xl mb-2">AIの読み取り結果について</h2>
                <p className="text-sm md:text-base leading-relaxed text-gachacho-ink/80">
                  台紙の読み取りはAIによる推定のため、商品名・価格・種類数・アイテム名などを誤ることがあります。
                  読み取り結果は保存前の確認画面で見直し、修正してから保存できます。
                  AI解析は1ユーザーにつき1日10回までです。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 運営者・お問い合わせ・法務 ===== */}
      <section className="section bg-white border-t border-gachacho-line">
        <div className="container">
          <motion.div {...reveal()} className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gachacho-rose-deep mb-3">Information</p>
            <h2 className="font-rounded font-bold text-2xl md:text-3xl leading-snug mb-8">
              運営者・お問い合わせ・規約
            </h2>

            <dl className="divide-y divide-gachacho-line border-y border-gachacho-line">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-mute">
                  <Building2 size={16} aria-hidden="true" /> 運営者
                </dt>
                <dd className="sm:col-span-8">
                  <Link to="/company" className="font-bold hover:text-gachacho-rose-deep underline underline-offset-4">
                    株式会社SmartThanks
                  </Link>
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-mute">
                  <Sparkles size={16} aria-hidden="true" /> アプリ名
                </dt>
                <dd className="sm:col-span-8 font-bold">{APP_NAME}</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-mute">
                  <ArrowRight size={16} aria-hidden="true" /> 配信
                </dt>
                <dd className="sm:col-span-8">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-gachacho-rose-deep underline underline-offset-4 break-all"
                  >
                    App Store（iPhone）
                  </a>
                  <span className="block text-sm text-gachacho-mute mt-1">Android版は準備中です。</span>
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-mute">
                  <Mail size={16} aria-hidden="true" /> お問い合わせ
                </dt>
                <dd className="sm:col-span-8">
                  <Link
                    to="/contact?type=gachacho"
                    className="font-bold hover:text-gachacho-rose-deep underline underline-offset-4"
                  >
                    お問い合わせフォーム
                  </Link>
                  <span className="block text-sm text-gachacho-mute mt-1">使い方・不具合・データの取扱いについて</span>
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-mute">
                  <FileText size={16} aria-hidden="true" /> 利用規約
                </dt>
                <dd className="sm:col-span-8">
                  <Link
                    to="/gachacho/terms"
                    className="font-bold hover:text-gachacho-rose-deep underline underline-offset-4"
                  >
                    {APP_NAME} 利用規約
                  </Link>
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
                <dt className="sm:col-span-4 flex items-center gap-2 text-sm font-bold text-gachacho-mute">
                  <ShieldCheck size={16} aria-hidden="true" /> プライバシー
                </dt>
                <dd className="sm:col-span-8">
                  <Link
                    to="/privacy#gachacho"
                    className="font-bold hover:text-gachacho-rose-deep underline underline-offset-4"
                  >
                    プライバシーポリシー（{APP_NAME}に関する個別の取扱い）
                  </Link>
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* ===== 最後のCTA ===== */}
      <section className="relative py-16 md:py-24 bg-gachacho-blush overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-20 -right-10 w-[320px] h-[320px] rounded-full bg-gachacho-rose/20 blur-3xl" />
        </div>
        <div className="container relative">
          <motion.div {...reveal()} className="max-w-2xl mx-auto text-center">
            <img
              src="/gachacho/icon-512.webp"
              alt=""
              width={80}
              height={80}
              loading="lazy"
              className="w-20 h-20 rounded-[1.25rem] shadow-lg shadow-gachacho-rose/30 mx-auto mb-6"
            />
            <h2 className="font-rounded font-bold text-2xl md:text-4xl leading-snug mb-4">
              今日引いたガチャから、
              <br className="sm:hidden" />
              はじめよう。
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gachacho-ink/80 mb-8">
              {APP_NAME}は無料でダウンロードできます。
            </p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-gachacho-ink text-white shadow-lg shadow-gachacho-ink/20 hover:-translate-y-0.5 hover:shadow-xl inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              App Storeでダウンロード
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gachacho;
