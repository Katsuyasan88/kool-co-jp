import { useEffect } from 'react';

const SITE_ORIGIN = 'https://smartthanks.world';

/**
 * <link rel="canonical"> をページ単位で設定する。
 * 後方互換リダイレクト（例: /terms → /gachacho/terms）を持つページで、
 * 検索エンジン上の正規 URL を明示するために使う。
 */
const useCanonical = (path: string) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = `${SITE_ORIGIN}${path}`;
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [path]);
};

export default useCanonical;
