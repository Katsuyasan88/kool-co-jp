// ガチャちょうの法務文書（利用規約・プライバシーポリシー）の型と取得処理。
//
// 本文の正本は CapCole リポジトリの docs/TERMS_AND_PRIVACY.md であり、
// そこから生成された JSON を public/gachacho/legal/ に静的配置している。
// このサイトでは本文を複製せず、同じ JSON を取得して描画することで二重管理を避ける。

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'table'; header: string[]; rows: string[][] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  schemaVersion: number;
  documentVersion: string;
  effectiveDate: string;
  lastUpdated: string;
  terms: { title: string; sections: LegalSection[] };
  privacy: { title: string; lead?: string[]; sections: LegalSection[] };
};

/** アプリと同じ固定配信元。版が上がっても URL は変えない。 */
export const GACHACHO_LEGAL_CURRENT_PATH = '/gachacho/legal/current.json';

/** 版別アーカイブの URL を返す。 */
export const gachachoLegalVersionPath = (documentVersion: string) =>
  `/gachacho/legal/versions/${documentVersion}.json`;

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((s) => typeof s === 'string');

const isBlock = (v: unknown): v is LegalBlock => {
  if (!v || typeof v !== 'object') return false;
  const b = v as Record<string, unknown>;
  switch (b.type) {
    case 'paragraph':
      return typeof b.text === 'string';
    case 'bullets':
      return isStringArray(b.items);
    case 'table':
      return isStringArray(b.header) && Array.isArray(b.rows) && b.rows.every(isStringArray);
    default:
      return false;
  }
};

const isSectionList = (v: unknown): v is LegalSection[] =>
  Array.isArray(v) &&
  v.every(
    (s) =>
      s &&
      typeof s === 'object' &&
      typeof (s as LegalSection).heading === 'string' &&
      Array.isArray((s as LegalSection).blocks) &&
      (s as LegalSection).blocks.every(isBlock),
  );

export const isLegalDocument = (v: unknown): v is LegalDocument => {
  if (!v || typeof v !== 'object') return false;
  const d = v as Record<string, unknown>;
  const terms = d.terms as Record<string, unknown> | undefined;
  const privacy = d.privacy as Record<string, unknown> | undefined;
  return (
    typeof d.documentVersion === 'string' &&
    typeof d.effectiveDate === 'string' &&
    typeof d.lastUpdated === 'string' &&
    !!terms &&
    typeof terms.title === 'string' &&
    isSectionList(terms.sections) &&
    !!privacy &&
    typeof privacy.title === 'string' &&
    isSectionList(privacy.sections)
  );
};

export const fetchGachachoLegal = async (signal?: AbortSignal): Promise<LegalDocument> => {
  const res = await fetch(GACHACHO_LEGAL_CURRENT_PATH, { signal, cache: 'no-cache' });
  if (!res.ok) {
    throw new Error(`Failed to load legal document: HTTP ${res.status}`);
  }
  const json: unknown = await res.json();
  if (!isLegalDocument(json)) {
    throw new Error('Legal document has an unexpected shape');
  }
  return json;
};

/** "2026-08-31" → "2026年8月31日" */
export const formatLegalDate = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${m[1]}年${Number(m[2])}月${Number(m[3])}日`;
};
