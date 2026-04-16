import { motion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle.ts';

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
            <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-8">プライバシーポリシー</h1>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="prose prose-lg max-w-none text-text-main space-y-8">
            <section>
              <p>
                株式会社SmartThanks（以下「当社」といいます。）は、当社が提供するサービス（以下「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
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
                <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をお断りするため</li>
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
              <p>本ポリシーに関するお問い合わせは、お問い合わせフォームよりお願いいたします。</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
