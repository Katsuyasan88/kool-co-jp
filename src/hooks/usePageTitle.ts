import { useEffect } from 'react';

/**
 * ページタイトルを設定する。
 * - 通常: `${title} | 株式会社SmartThanks`
 * - isHome: サイト名のみ
 * - fullTitle: title をそのまま使う（サービスLPなど、会社名よりサービス名を前に出したいページ。
 *   ビルド時に生成する静的 HTML（src/data/pageMeta.json）と同じ文字列を渡す）
 */
const usePageTitle = (title: string, isHome: boolean = false, fullTitle: boolean = false) => {
  useEffect(() => {
    const baseTitle = "株式会社SmartThanks";
    if (isHome) {
      document.title = baseTitle;
    } else if (fullTitle) {
      document.title = title;
    } else {
      document.title = `${title} | ${baseTitle}`;
    }
  }, [title, isHome, fullTitle]);
};

export default usePageTitle;
