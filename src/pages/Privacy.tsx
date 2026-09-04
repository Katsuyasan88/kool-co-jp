import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.ts';
import useGachachoLegal from '../hooks/useGachachoLegal.ts';
import LegalBlocks from '../components/LegalBlocks.tsx';
import {
  formatLegalDate,
  gachachoLegalVersionPath,
  GACHACHO_LEGAL_CURRENT_PATH,
} from '../data/gachachoLegal.ts';

const LAST_UPDATED = '2026年8月28日';

const SUPPORT_EMAIL = 'support_smartthanks@kool.co.jp';

const Privacy = () => {
  usePageTitle("プライバシーポリシー");
  const legal = useGachachoLegal();
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">Legal</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">プライバシーポリシー</h1>
            <p className="text-sm text-text-muted mb-8">最終更新日: {LAST_UPDATED}</p>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="prose prose-lg max-w-none text-text-main space-y-8">
            <section>
              <p>
                株式会社SmartThanks（以下「当社」といいます。）は、当社が提供するサービス（以下「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
              </p>
              <p className="mt-4">
                本ポリシーは会社共通の方針を定めるものです。個別のサービスにおける情報の取扱いに固有の定めがある場合は、本ページ内に当該サービスに関する項を設けて定めます。
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">1. 個人情報の定義</h2>
              <p>
                「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報（個人識別符号に含まれるものを含む）を指します。
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">2. 個人情報の取得方法</h2>
              <p>
                当社は、ユーザーが本サービスを利用する際に、氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号などの個人情報をお尋ねすることがあります。
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">3. 個人情報を収集・利用する目的</h2>
              <p>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>本サービスの提供・運営のため</li>
                <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため</li>
                <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
                <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーを特定し、ご利用をお断りするため</li>
                <li>ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</li>
                <li>有料サービスにおいて、ユーザーに利用料金を請求するため</li>
                <li>上記の利用目的に付随する目的</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">4. 利用目的の変更</h2>
              <p>
                当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。変更を行った場合には、変更後の目的について、当社所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">5. 個人情報の第三者提供</h2>
              <p>
                当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">6. 個人情報の管理</h2>
              <p>
                当社は、個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">7. 個人情報の開示、訂正、利用停止等</h2>
              <p>
                ユーザーは、当社の保有する自己の個人情報について、個人情報保護法等の定めに基づき、開示、訂正、追加、削除、利用停止または消去等を請求することができます。手続きの詳細については、後述のお問い合わせ窓口までご連絡ください。
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">8. お問い合わせ窓口</h2>
              <p>
                本ポリシーに関するお問い合わせは、
                <Link to="/contact" className="text-primary underline hover:text-primary-dark">お問い合わせフォーム</Link>
                または下記メールアドレスまでお願いいたします。
              </p>
              <p className="mt-4">
                メールアドレス:{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary underline hover:text-primary-dark break-all">
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </section>

            {/*
              ガチャちょうの個別の取扱いは、アプリ・利用規約ページと同じ法務JSON
              （/gachacho/legal/current.json）の privacy 本文を描画する。
              本文の正本は CapCole 側にあり、このファイルへ文言を書かない。
            */}
            <section id="gachacho" className="scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">9. ガチャちょうに関する個別の取扱い</h2>

              {legal.status === 'loading' && (
                <div className="space-y-3" role="status" aria-live="polite" aria-label="ガチャちょうのプライバシーポリシーを読み込んでいます">
                  <div className="h-4 w-full bg-bg-soft rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-bg-soft rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-bg-soft rounded animate-pulse" />
                </div>
              )}

              {legal.status === 'error' && (
                <div className="bg-bg-soft border border-border rounded-2xl p-6 md:p-8 text-center" role="alert">
                  <p className="font-bold mb-3">ガチャちょうのプライバシーポリシーを読み込めませんでした。</p>
                  <p className="text-sm text-text-muted mb-6">
                    ページを再読み込みしてください。改善しない場合は、
                    <Link to="/contact?type=gachacho-privacy" className="text-primary underline hover:text-primary-dark">
                      お問い合わせ
                    </Link>
                    または{' '}
                    <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary underline hover:text-primary-dark break-all">
                      {SUPPORT_EMAIL}
                    </a>
                    {' '}までご連絡ください。
                  </p>
                  <button onClick={() => window.location.reload()} className="btn btn-outline">
                    再読み込みする
                  </button>
                </div>
              )}

              {legal.status === 'ready' && (
                <>
                  <p className="text-sm text-text-muted mb-4">
                    {legal.doc.privacy.title}（アプリ「ガチャちょう」）／ 文書版 {legal.doc.documentVersion} ／ 制定日{' '}
                    {formatLegalDate(legal.doc.effectiveDate)} ／ 最終更新日 {formatLegalDate(legal.doc.lastUpdated)}
                  </p>
                  {legal.doc.privacy.lead?.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                  <LegalBlocks sections={legal.doc.privacy.sections} headingLevel="h3" />
                  <p className="mt-6 text-sm text-text-muted flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>機械可読版:</span>
                    <a href={GACHACHO_LEGAL_CURRENT_PATH} className="underline hover:text-primary break-all">
                      current.json
                    </a>
                    <span>／</span>
                    <a
                      href={gachachoLegalVersionPath(legal.doc.documentVersion)}
                      className="underline hover:text-primary break-all"
                    >
                      versions/{legal.doc.documentVersion}.json
                    </a>
                  </p>
                </>
              )}
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
