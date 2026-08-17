import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, Smartphone } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.ts';

const SUPPORT_EMAIL = 'support_smartthanks@kool.co.jp';

const IP_CLAIM_ITEM = '著作権・商標等の権利侵害について';

const Contact = () => {
  usePageTitle("お問い合わせ");
  const [searchParams] = useSearchParams();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [selectedItem, setSelectedItem] = useState('事業・サービスについて');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'own-product') setSelectedItem('事業・サービスについて');
    if (type === 'producing') setSelectedItem('新規事業立ち上げ支援について');
    if (type === 'mentoring') setSelectedItem('研修・メンタリングについて');
    if (type === 'gachacho') setSelectedItem('ガチャちょうの使い方・不具合について');
    if (type === 'gachacho-privacy') setSelectedItem('ガチャちょうのデータ・プライバシーについて');
    if (type === 'ip-claim') setSelectedItem(IP_CLAIM_ITEM);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      item: formData.get('item'),
      message: formData.get('message'),
    };
    // ...後続ロジックは維持

    // AWS API Gatewayで発行された実際のエンドポイント
    const API_ENDPOINT = 'https://b2vrcx3tx1.execute-api.ap-northeast-1.amazonaws.com/prod/contact';

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error(err);
      setFormStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-10"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 md:mb-4">Contact</h1>
            <div className="w-12 h-1 bg-secondary mx-auto mb-4 md:mb-6 rounded-full" />
            <p className="text-text-muted text-base md:text-lg">
              事業に関するご相談、取材、その他お問い合わせは<br className="md:hidden" />
              以下のフォームよりお願いいたします。
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Contact Form */}
            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border-2 border-primary/20 p-12 rounded-[2rem] text-center shadow-lg"
              >
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">送信が完了しました</h2>
                <p className="text-text-muted mb-8 text-lg">
                  お問い合わせありがとうございます。内容を確認の上、担当者より折り返しご連絡させていただきます。
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="btn btn-outline"
                >
                  別のメッセージを送る
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-border p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">お名前 <span className="text-red-500">*</span></label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="山田 太郎"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">メールアドレス <span className="text-red-500">*</span></label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="example@mail.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2">お問い合わせ項目 <span className="text-red-500">*</span></label>
                  <select
                    name="item"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-white font-medium"
                  >
                    <option>事業・サービスについて</option>
                    <option>新規事業立ち上げ支援について</option>
                    <option>研修・メンタリングについて</option>
                    <option>IT/経営コンサルティングについて</option>
                    <option>取材・メディア掲載について</option>
                    <option>ガチャちょうの使い方・不具合について</option>
                    <option>ガチャちょうのデータ・プライバシーについて</option>
                    <option>{IP_CLAIM_ITEM}</option>
                    <option>その他</option>
                  </select>
                </div>

                {selectedItem === IP_CLAIM_ITEM && (
                  <div className="mb-6 p-5 rounded-xl bg-bg-soft border border-border text-sm leading-relaxed">
                    <p className="font-bold mb-2">権利侵害に関するお申し立てについて</p>
                    <p className="mb-3">メッセージ内容には、次の情報をご記載ください。</p>
                    <ul className="list-disc pl-5 space-y-1 text-text-muted">
                      <li>申立者の氏名・組織名・連絡先</li>
                      <li>権利者本人または代理人であることの説明</li>
                      <li>対象となる著作物・商標等</li>
                      <li>問題となる表示・画像・画面の説明</li>
                      <li>確認に必要なURL、スクリーンショット、登録番号等</li>
                      <li>希望する対応</li>
                    </ul>
                    <p className="mt-3 text-text-muted">
                      お申し立ての内容は受付後に確認のうえ、対応いたします。
                    </p>
                  </div>
                )}

                <div className="mb-8">
                  <label className="block text-sm font-bold mb-2">メッセージ内容 <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="お問い合わせ内容をご記入ください"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn btn-primary w-full flex items-center justify-center gap-2 h-12 md:h-14 text-base md:text-lg rounded-xl md:rounded-2xl"
                >
                  {formStatus === 'submitting' ? '送信中...' : <>メッセージを送信する <Send size={20} /></>}
                </button>

                {formStatus === 'error' && (
                  <p className="mt-4 text-sm text-red-600 text-center font-medium">
                    送信に失敗しました。しばらくしてから再度お試しください。
                  </p>
                )}
              </form>
            )}

            {/* ガチャちょう利用者向け案内 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-10 bg-white border border-border p-6 md:p-8 rounded-[2rem] shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Smartphone size={20} />
                </div>
                <h2 className="text-lg md:text-xl font-bold">アプリ「ガチャちょう」に関するお問い合わせ</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed mb-4">
                ガチャちょうに関するお問い合わせは、このフォームまたは{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary underline hover:text-primary-dark break-all inline-flex items-center gap-1">
                  <Mail size={14} className="shrink-0" />{SUPPORT_EMAIL}
                </a>{' '}
                で受け付けています。
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-text-muted leading-relaxed">
                <li>アプリ内のデータを削除するには、アプリの三本メニュー →「データリセット」を実行してください。</li>
                <li>データリセットは取り消せません。実行前に内容をご確認ください。</li>
                <li>現行のデータリセットでは、匿名アカウントとAI解析履歴は削除されずに残ります。</li>
                <li>
                  データの取扱いの詳細は{' '}
                  <Link to="/privacy#gachacho" className="text-primary underline hover:text-primary-dark">
                    プライバシーポリシー「ガチャちょうに関する個別の取扱い」
                  </Link>{' '}
                  をご覧ください。
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
