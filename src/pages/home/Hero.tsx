import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[90vh] flex items-center pt-24 md:pt-20 overflow-hidden">
      {/* Abstract Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-10 grayscale pointer-events-none"
        style={{
          backgroundImage: 'url("/hero-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Animated Background Blobs */}
      <div className="circle-blob w-[600px] h-[600px] bg-primary top-[-100px] right-[-100px] blur-[120px]" />
      <div className="circle-blob w-[500px] h-[500px] bg-secondary bottom-[-100px] left-[-100px] blur-[100px]" />

      <div className="container relative z-10">
        <div className="max-w-3xl">
          {/* ヒーローセクションはJS読み込み後、即座に表示されるようにアニメーションなしの静的な初期状態を維持 */}
          <div className="relative z-20">
            <h1
              className="text-2xl md:text-7xl font-extrabold mb-6"
              style={{ lineHeight: '1.4' }}
            >
              循環が生む、<br />
              <span className="gradient-text">新しい価値のカタチ。</span>
            </h1>
            <p className="text-sm md:text-xl text-text-muted mb-10 leading-relaxed md:leading-loose max-w-2xl">
              株式会社SmartThanksは、自社サービスの開発と他社様の新規事業支援を通じて、
              知恵と感謝が循環するデジタル社会の未来を創造します。
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/service" className="btn btn-outline flex items-center gap-2">
                事業内容を見る <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn btn-primary">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Visual elements - heavy animations deferred slightly or simplified */}
      <motion.div
        className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-1/2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="relative w-[500px] h-[500px] mx-auto flex items-center justify-center">
          <div className="absolute inset-0 border-[3px] border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"
            style={{ borderStyle: 'double', borderWidth: '10px', borderLeftColor: 'transparent', borderRightColor: 'transparent' }} />
          <div className="absolute inset-10 border-[2px] border-secondary/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"
            style={{ borderStyle: 'dashed' }} />
          <div className="absolute inset-20 border-[4px] border-primary/10 rounded-full animate-[spin_25s_linear_infinite]"
            style={{ borderStyle: 'dotted' }} />
          
          <div className="absolute w-[460px] h-[460px] animate-[spin_12s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full blur-md shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary rounded-full blur-sm" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
