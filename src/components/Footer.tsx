import { Link } from 'react-router-dom';
import { Shield, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fafafa] border-t border-border pt-20 pb-10">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-10">

          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="SmartThanks Logo" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold tracking-tighter">SmartThanks</span>
            </Link>
            <p className="text-text-muted text-sm md:text-base leading-relaxed md:leading-loose max-w-md mb-4">
              「知恵と感謝の循環」をテクノロジーで具現化する。<br />
              私たちは、新しい価値を生み出し続ける<br className="hidden lg:block" />
              クリエイティブ・エンジニアリング・パートナーです。
            </p>
          </div>

          {/* Links 1 */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 underline decoration-secondary decoration-2 underline-offset-8">Services</h4>
            <ul className="space-y-2 text-text-muted font-medium">
              <li><Link to="/service" className="hover:text-primary transition-colors">自社プロダクト開発</Link></li>
              <li><Link to="/service" className="hover:text-primary transition-colors">新規事業支援</Link></li>
              <li><Link to="/service" className="hover:text-primary transition-colors">研修・メンタリング</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">ITコンサルティング</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 underline decoration-secondary decoration-2 underline-offset-8">Company</h4>
            <ul className="space-y-2 text-text-muted font-medium">
              <li><Link to="/company" className="hover:text-primary transition-colors">会社概要</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">お知らせ</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">お問い合わせ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 lg:col-span-3 lg:pl-8">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 underline decoration-secondary decoration-2 underline-offset-8">Information</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="text-sm">
                  <p className="font-bold mb-1">本社所在地</p>
                  <p className="text-text-muted leading-relaxed">〒791-8042 愛媛県松山市</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-xs font-bold text-text-muted uppercase tracking-widest">
            <p>© {currentYear} SmartThanks Inc.</p>
            <span className="w-1 h-1 bg-border rounded-full hidden md:block" />
            <p className="hidden md:block">Ehime, Japan</p>
          </div>
          <div className="flex gap-8 items-center">
            <a href="#" className="text-xs font-bold text-text-muted hover:text-primary transition-colors flex items-center gap-2">
              <Shield size={14} /> Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
