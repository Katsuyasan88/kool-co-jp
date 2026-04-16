import { lazy, Suspense } from 'react';
import usePageTitle from '../hooks/usePageTitle.ts';
import Hero from './home/Hero.tsx';
import ServicesSection from './home/ServicesSection.tsx';
import Achievements from './home/Achievements.tsx';

// ページ後半の重いセクション、または優先度の低いセクションのみ遅延読み込みを継続
const Vision = lazy(() => import('./home/Vision.tsx'));
const NewsSection = lazy(() => import('./home/NewsSection.tsx'));
const CTASection = lazy(() => import('./home/CTASection.tsx'));

const Home = () => {
  // ページタイトルの設定
  usePageTitle("", true);

  return (
    <div className="home-page">
      {/* ヒーローセクションは即時レンダリング */}
      <Hero />

      {/* 
        以下のセクションはスクロールに応じて、あるいはバックグラウンドで順次読み込まれる。
        Suspenseにより、読み込み待ちの間もヒーローセクションの閲覧を妨げない。
      */}
      <ServicesSection />
      <Achievements />

      <Suspense fallback={null}>
        <Vision />
      </Suspense>

      <Suspense fallback={null}>
        <NewsSection />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <CTASection />
      </Suspense>
    </div>
  );
};

export default Home;
