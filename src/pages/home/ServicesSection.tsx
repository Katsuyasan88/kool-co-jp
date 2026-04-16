import { motion } from 'framer-motion';
import { RefreshCw, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  return (
    <section className="section bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 1, y: 0 }} /* 初期状態を「表示」にする */
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-5 md:mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4 leading-tight">Our Services</h2>
          <div className="w-12 h-1 bg-secondary mx-auto mb-4 md:mb-6 rounded-full" />
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed md:leading-loose">
            「自走」と「共創」の循環。<br className="md:hidden" />
            私たちが提供するコア・バリューです。<br />
            最新の技術知見と<br className="md:hidden" />
            現場主義の伴走支援を融合させました。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              tag: "01",
              label: "Own Product",
              icon: <RefreshCw className="w-6 h-6" />,
              title: "自社サービス開発",
              desc: "「迅速な挑戦と失敗」をテーマに独創的な自社サービスを展開。これまでの全開発プロジェクトは現在の技術基盤の礎となっています。"
            },
            {
              tag: "02",
              label: "Producing",
              icon: <Zap className="w-6 h-6" />,
              title: "新規事業立ち上げ支援",
              desc: "コンセプト立案からプロトタイプ制作まで、伴走型で事業化をサポート。確かな実装力に基づいた現実的な提案が強みです。"
            },
            {
              tag: "03",
              label: "Mentoring",
              icon: <CheckCircle className="w-6 h-6" />,
              title: "研修・メンタリング",
              desc: "次世代の起業家・リーダー育成や、組織の自走を支援する研修・メンタリングを提供。現場で使える「生きた知見」を伝承します。"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 1, y: 0 }} /* チラつき防止のため透明度0は避ける */
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.02 }} /* ディレイを極小化 */
              whileHover={{ y: -12 }}
              className="group relative bg-[#fcfcfc] border border-border p-6 md:p-10 rounded-[2.5rem] hover:shadow-2xl hover:border-primary/20 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 p-6 text-6xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
                {item.tag}
              </div>

              <div className="relative z-10 flex-grow flex flex-col">
                <div className="hidden md:flex w-14 h-14 bg-white rounded-2xl shadow-lg border border-border items-center justify-center text-primary mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase mb-1 md:mb-2 block">{item.label}</span>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-5">{item.title}</h3>
                <p className="text-text-muted leading-relaxed text-sm mb-4 md:mb-8 flex-grow">{item.desc}</p>

                <Link
                  to={item.tag === "01" ? "/service#own-product" : item.tag === "02" ? "/service#producing" : "/service#mentoring"}
                  className="inline-flex items-center gap-2 text-sm font-bold text-text-main group-hover:text-primary transition-colors mt-auto"
                >
                  詳細を見る <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
