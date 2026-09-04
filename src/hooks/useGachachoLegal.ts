import { useEffect, useState } from 'react';
import { fetchGachachoLegal, type LegalDocument } from '../data/gachachoLegal.ts';

export type GachachoLegalState =
  | { status: 'loading' }
  | { status: 'ready'; doc: LegalDocument }
  | { status: 'error' };

/**
 * ガチャちょうの法務文書（/gachacho/legal/current.json）を取得する。
 * 利用規約ページとプライバシーポリシーのガチャちょう個別項で同じ取得・検証処理を共有し、
 * 本文をこのリポジトリ側に複製しない。
 */
const useGachachoLegal = (): GachachoLegalState => {
  const [state, setState] = useState<GachachoLegalState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    fetchGachachoLegal(controller.signal)
      .then((doc) => setState({ status: 'ready', doc }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        console.error(err);
        setState({ status: 'error' });
      });
    return () => controller.abort();
  }, []);

  return state;
};

export default useGachachoLegal;
