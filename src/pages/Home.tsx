import { lazy, Suspense } from 'react';
import usePageTitle from '../hooks/usePageTitle.ts';
// Initial critical components
import Hero from './home/Hero.tsx';

// Non-critical sections (Lazy loaded)
const ServicesSection = lazy(() => import('./home/ServicesSection.tsx'));
const Achievements = lazy(() => import('./home/Achievements.tsx'));

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
      <Suspense fallback={<div className="h-20" />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-20" />}>
        <Achievements />
      </Suspense>

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
