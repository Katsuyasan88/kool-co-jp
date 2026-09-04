import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileJson } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle.ts';
import useCanonical from '../hooks/useCanonical.ts';
import useGachachoLegal from '../hooks/useGachachoLegal.ts';
import LegalBlocks from '../components/LegalBlocks.tsx';
import {
  formatLegalDate,
  gachachoLegalVersionPath,
  GACHACHO_LEGAL_CURRENT_PATH,
} from '../data/gachachoLegal.ts';

/**
 * ガチャちょう 利用規約（公開 URL: /gachacho/terms）
 *
 * 本文はアプリと同じ /gachacho/legal/current.json から取得して描画する。
 * このファイルに規約本文を書かないこと（本文の正本は CapCole 側）。
 */
const GachachoTerms = () => {
  usePageTitle('ガチャちょう 利用規約');
  useCanonical('/gachacho/terms');
  const state = useGachachoLegal();

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
            <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
              {state.status === 'ready' ? state.doc.terms.title : '利用規約'}
            </h1>
            <p className="text-sm text-text-muted mb-2">
              アプリ「
              <Link to="/gachacho" className="text-primary underline hover:text-primary-dark">
                ガチャちょう
              </Link>
              」の利用規約です。
            </p>
            {state.status === 'ready' && (
              <p className="text-sm text-text-muted mb-8">
                文書版 {state.doc.documentVersion} ／ 制定日 {formatLegalDate(state.doc.effectiveDate)} ／
                最終更新日 {formatLegalDate(state.doc.lastUpdated)}
              </p>
            )}
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          {state.status === 'loading' && (
            <div className="space-y-6" role="status" aria-live="polite" aria-label="利用規約を読み込んでいます">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-6 w-2/5 bg-bg-soft rounded animate-pulse" />
                  <div className="h-4 w-full bg-bg-soft rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-bg-soft rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-bg-soft rounded animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {state.status === 'error' && (
            <div className="bg-bg-soft border border-border rounded-2xl p-8 text-center" role="alert">
              <p className="font-bold mb-3">利用規約を読み込めませんでした。</p>
              <p className="text-sm text-text-muted mb-6">
                ページを再読み込みしてください。改善しない場合は、
                <Link to="/contact?type=gachacho" className="text-primary underline hover:text-primary-dark">
                  お問い合わせ
                </Link>
                からご連絡ください。
              </p>
              <button onClick={() => window.location.reload()} className="btn btn-outline">
                再読み込みする
              </button>
            </div>
          )}

          {state.status === 'ready' && (
            <>
              <div className="prose prose-lg max-w-none text-text-main space-y-8">
                <LegalBlocks sections={state.doc.terms.sections} />
              </div>

              <div className="mt-16 pt-8 border-t border-border text-sm text-text-muted space-y-3">
                <p>
                  プライバシーポリシーは
                  <Link to="/privacy#gachacho" className="text-primary underline hover:text-primary-dark">
                    こちら
                  </Link>
                  。お問い合わせは
                  <Link to="/contact?type=gachacho" className="text-primary underline hover:text-primary-dark">
                    お問い合わせフォーム
                  </Link>
                  からお願いいたします。
                </p>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <FileJson size={14} className="shrink-0" aria-hidden="true" />
                  <span>機械可読版:</span>
                  <a href={GACHACHO_LEGAL_CURRENT_PATH} className="underline hover:text-primary break-all">
                    current.json
                  </a>
                  <span>／</span>
                  <a
                    href={gachachoLegalVersionPath(state.doc.documentVersion)}
                    className="underline hover:text-primary break-all"
                  >
                    versions/{state.doc.documentVersion}.json
                  </a>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GachachoTerms;
