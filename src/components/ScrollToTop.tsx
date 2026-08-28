import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // 遅延読み込みページでは対象要素の描画を待つ必要がある
    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let timer: number | undefined;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start' });
      } else if (attempts < 20) {
        attempts += 1;
        timer = window.setTimeout(tryScroll, 100);
      }
    };
    tryScroll();

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
