import { useEffect } from 'react';

const SITE_ORIGIN = 'https://smartthanks.world';

/**
 * <link rel="canonical"> をページ単位で設定する。
 * 後方互換リダイレクト（例: /terms → /gachacho/terms）を持つページで、
 * 検索エンジン上の正規 URL を明示するために使う。
 */
const useCanonical = (path: string) => {
  useEffect(() => {
    // ビルド時に生成した静的 HTML（OGP 用）が同じ canonical を持つ場合は二重に追加しない
    const href = `${SITE_ORIGIN}${path}`;
    if (document.querySelector(`link[rel="canonical"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = href;
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [path]);
};

export default useCanonical;
