import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.ts';

const LAST_UPDATED = '2026年8月17日';

const SUPPORT_EMAIL = 'support_smartthanks@kool.co.jp';

const Privacy = () => {
  usePageTitle("プライバシーポリシー");
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

            <section id="gachacho" className="scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">9. ガチャちょうに関する個別の取扱い</h2>

              <h3 className="text-lg md:text-xl font-bold mt-6 mb-3">9.1 対象サービス</h3>
              <p>
                「ガチャちょう」は、カプセルトイの台紙写真をAIで読み取り、ユーザー個人のコレクションを記録・管理するアプリです。本項は、ガチャちょうにおける情報の取扱いを定めるものであり、会社共通のプライバシーポリシーとあわせて適用されます。
              </p>

              <h3 className="text-lg md:text-xl font-bold mt-6 mb-3">9.2 取得・処理する情報</h3>
              <p>ガチャちょうでは、サービス提供のために次の情報を取得または処理します。</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Firebase Authenticationが発行する匿名アカウント識別子</li>
                <li>ユーザーが撮影または選択したカプセルトイの台紙画像</li>
                <li>AI解析結果およびユーザーが編集した商品名、メーカー・シリーズ名、価格、種類数、アイテム名、切り抜き画像</li>
                <li>コレクション記録（アイテムの所持数）</li>
                <li>思い出メモ（ユーザーが入力した日付、場所、メモ本文）</li>
                <li>AI解析の利用履歴（実行日時、使用モデル、成否、処理時間、検出件数、トークン使用量等）</li>
                <li>問い合わせ時にユーザーが入力した氏名、メールアドレス、問い合わせ内容</li>
              </ul>
              <p className="mt-4">
                ガチャちょうは、アプリの利用にあたり氏名、メールアドレス、電話番号、GPSによる位置情報の登録を求めません。思い出メモの場所欄は、ユーザーが任意で入力するテキストです。
              </p>

              <h3 className="text-lg md:text-xl font-bold mt-6 mb-3">9.3 利用目的</h3>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>匿名認証とユーザーごとのデータ分離</li>
                <li>台紙画像のAI解析、切り抜き、ガチャ帳の作成・表示</li>
                <li>コレクションと思い出メモの保存・同期</li>
                <li>AI解析回数の制御、不正利用防止、障害調査</li>
                <li>AI解析の品質、成功率、処理時間、利用コストの把握</li>
                <li>問い合わせへの対応</li>
                <li>法令・利用規約への対応</li>
              </ul>

              <h3 className="text-lg md:text-xl font-bold mt-6 mb-3">9.4 外部サービスへの送信</h3>
              <div className="overflow-x-auto mt-4">
                <table className="w-full min-w-[560px] text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="bg-bg-soft">
                      <th className="border border-border px-4 py-3 text-left font-bold">外部サービス</th>
                      <th className="border border-border px-4 py-3 text-left font-bold">主な送信・保存内容</th>
                      <th className="border border-border px-4 py-3 text-left font-bold">利用目的</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-3">OpenAI</td>
                      <td className="border border-border px-4 py-3">AI解析を実行する台紙画像</td>
                      <td className="border border-border px-4 py-3">商品情報・アイテム情報・切り抜き候補の解析</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">Google Firebase</td>
                      <td className="border border-border px-4 py-3">匿名アカウント識別子、ガチャ帳、所持数、思い出メモ、AI解析利用履歴</td>
                      <td className="border border-border px-4 py-3">認証、データ保存、利用回数管理</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3">Amazon Web Services</td>
                      <td className="border border-border px-4 py-3">API処理対象の画像、保存確定した台紙画像・切り抜き画像</td>
                      <td className="border border-border px-4 py-3">AI解析APIの実行、画像処理、画像保存・配信</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                当社は、各外部サービスをその利用規約およびプライバシーに関する条件に基づいて利用します。収集した情報を広告目的で販売することはありません。
              </p>

              <h3 className="text-lg md:text-xl font-bold mt-6 mb-3">9.5 端末内の一時画像とクラウド保存</h3>
              <p>
                AI解析と保存前の切り抜き調整に使用する作業画像は、追加フロー中に端末内で一時的に保持され、保存成功またはフロー終了後に破棄されます。AI解析時には台紙画像をOpenAIへ送信しますが、この時点ではAmazon S3へ永続保存しません。「ガチャ帳に保存する」を実行した場合に限り、保存確定した台紙画像と切り抜き画像をAmazon S3へ保存します。
              </p>
              <p className="mt-4">
                現行版では、Amazon S3へ保存した画像は、推測困難なURLを使用していますが、そのURLを知る第三者が閲覧できる設定です。一般公開前に画像の非公開化を実施する予定であり、非公開化後は公開時点の実態に合わせてこの記載を更新します。
              </p>

              <h3 className="text-lg md:text-xl font-bold mt-6 mb-3">9.6 保存期間</h3>
              <p>
                ガチャ帳、所持数、思い出メモおよび保存画像は、ユーザーが削除操作を行うか、当社がサービス提供上不要と判断するまで保持します。AI解析の利用履歴は、解析回数の制御、不正利用防止、品質・コスト把握のため保持します。具体的な保持期間を定めた場合は、本ページで公表します。
              </p>
              <p className="mt-4">
                ガチャ帳を1冊だけ削除した場合、対応する画像がサーバー上に残ることがあります。アプリの「データリセット」を実行した場合、すべてのガチャ帳、所持数、思い出メモおよびユーザーごとの保存画像を削除します。
              </p>

              <h3 className="text-lg md:text-xl font-bold mt-6 mb-3">9.7 データの削除</h3>
              <p>
                現行版の「データリセット」では、匿名アカウント識別子、AI解析回数の管理情報およびAI解析の利用履歴は、不正利用防止とサービス運用のため保持されます。すべてのアカウント情報の削除対応は今後実装予定であり、実装完了後に本項を更新します。
              </p>
              <p className="mt-4">
                データの取扱いまたは削除に関するお問い合わせは、
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary underline hover:text-primary-dark break-all">
                  {SUPPORT_EMAIL}
                </a>
                までご連絡ください。
              </p>

              <h3 className="text-lg md:text-xl font-bold mt-6 mb-3">9.8 第三者の権利を含む画像</h3>
              <p>
                ユーザーは、法令または権利者の許諾により利用できる画像のみを送信してください。台紙、商品画像、キャラクター、ロゴ等の権利は各権利者に帰属します。当社は、ガチャちょうの提供に必要な範囲で、ユーザーが送信した画像を解析、切り抜き、保存および表示します。
              </p>
              <p className="mt-4">
                権利侵害に関するご連絡は、対象となる内容、権利者との関係、確認可能な資料および連絡先を添えて、
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary underline hover:text-primary-dark break-all">
                  {SUPPORT_EMAIL}
                </a>
                までお送りください。
                <Link to="/contact" className="text-primary underline hover:text-primary-dark">お問い合わせフォーム</Link>
                からもご連絡いただけます。
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
