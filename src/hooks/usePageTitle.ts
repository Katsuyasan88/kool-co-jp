import { useEffect } from 'react';

const usePageTitle = (title: string, isHome: boolean = false) => {
  useEffect(() => {
    const baseTitle = "株式会社SmartThanks";
    if (isHome) {
      document.title = baseTitle;
    } else {
      document.title = `${title} | ${baseTitle}`;
    }
  }, [title, isHome]);
};

export default usePageTitle;
