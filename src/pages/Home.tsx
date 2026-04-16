import { motion } from 'framer-motion';
import { ArrowRight, Zap, RefreshCw, CheckCircle, User, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import newsData from '../data/news.json';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
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
            </motion.div>
          </div>
        </div>

        {/* Abstract "Circulation" Visual */}
        <motion.div
          className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div className="relative w-[500px] h-[500px] mx-auto flex items-center justify-center">
            {/* Abstract Gradient Rings */}
            <div className="absolute inset-0 border-[3px] border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"
              style={{ borderStyle: 'double', borderWidth: '10px', borderLeftColor: 'transparent', borderRightColor: 'transparent' }} />

            <div className="absolute inset-10 border-[2px] border-secondary/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"
              style={{ borderStyle: 'dashed' }} />

            <div className="absolute inset-20 border-[4px] border-primary/10 rounded-full animate-[spin_25s_linear_infinite]"
              style={{ borderStyle: 'dotted' }} />

            {/* Glowing Orbs (Abstract energy) */}
            <div className="absolute w-[460px] h-[460px] animate-[spin_12s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full blur-md shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary rounded-full blur-sm" />
            </div>

            <div className="absolute w-[340px] h-[340px] animate-[spin_8s_linear_infinite_reverse]">
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-accent rounded-full blur-sm shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Summary */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
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

      {/* Track Record Section */}
      <section className="section bg-white overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4 md:mb-8"
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">Our Achievements</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mb-4 md:mb-6 rounded-full" />

            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              守秘義務に基づき具体名は伏せておりますが、<br className="hidden md:block" />
              数々の挑戦的なプロジェクトで成果を挙げてきました。
            </p>
          </motion.div>

          {/* Records Counter at Top-Right of the List */}
          <div className="flex justify-end mb-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-primary font-bold bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
            >
              <span className="text-lg md:text-2xl">10+</span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-widest leading-tight">Successful<br />Projects</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { year: "2025", title: "大手飲料アプリプロトタイプ制作", tags: ["PoC Support", "Prototype Development"] },
              { year: "2025", title: "大手自動車新規事業創出メンタリング", tags: ["Mentoring", "Business Producing"] },
              { year: "2024", title: "AIスタートアップ市場調査・戦略立案支援", tags: ["Market Research", "Business Producing"] },
              { year: "2023", title: "小売店向けスタンプシステム実証実験", tags: ["PoC Support", "Retail Tech"] }
            ].map((record, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg-soft border border-border p-8 rounded-3xl hover:border-primary/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 bg-white border border-border rounded-full text-xs font-bold text-text-muted mb-3 md:mb-4">{record.year}</span>
                  <h3 className="text-base md:text-xl font-bold mb-4 md:mb-6">{record.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {record.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-primary/60">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Vision Section */}
      <section className="section bg-bg-soft relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
                <User size={16} /> Founder's Vision
              </div>
              <h2
                className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 leading-tight"
              >
                「失敗」と「成功」に<br />
                創業者がコミットする。
              </h2>
              <div className="space-y-6 text-text-muted text-base md:text-lg leading-relaxed md:leading-loose">
                <p>
                  私たちは少数精鋭の体制を敷いています。それは、私が全てのプロジェクトに直接深く関わり、迅速かつ柔軟に意思決定を行うためです。
                </p>
                <p>
                  「挑戦を単なる成功にも失敗にも終わらせない」をスローガンに。1つひとつの案件に私が全責任を持ち、お客様のビジョンを最短距離で具現化することをお約束します。
                </p>
              </div>
              <div className="mt-12 p-6 bg-white border border-border rounded-2xl flex items-center gap-6">
                <div>
                  <p className="font-bold text-xl">武智 勝哉</p>
                  <p className="text-sm text-text-muted">Founder / CEO</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary"><CheckCircle size={20} /></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                <img
                  src="/founder.png"
                  alt="Founder Abstract Vision"
                  className="relative z-10 w-full max-w-md mx-auto rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Summary */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4 md:mb-8"
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4 leading-tight">News</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mb-4 md:mb-6 rounded-full" />
            <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed md:leading-loose">
              SmartThanksの最新情報をお届けします。
            </p>
          </motion.div>

          <div className="space-y-4">
            {newsData.slice(0, 3).map((news) => {
              const isExternal = !!news.url;
              const ItemWrapper = isExternal ? 'a' : 'div';
              const wrapperProps = isExternal ? {
                href: news.url,
                target: "_blank",
                rel: "noopener noreferrer"
              } : {};

              return (
                <ItemWrapper
                  key={news.id}
                  {...wrapperProps}
                  className={`border-b border-border pb-6 flex flex-col md:flex-row md:items-start gap-4 transition-all duration-300 ${isExternal ? 'hover:pl-4 hover:text-primary cursor-pointer border-primary/20 bg-primary/0 hover:bg-primary/[0.02]' : ''
                    }`}
                >
                  <div className="flex items-center gap-4 md:w-56 shrink-0 pt-0.5">
                    <span className="text-sm font-bold text-text-muted w-20 shrink-0">{news.date}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-bg-soft rounded border border-border font-bold uppercase tracking-wider text-primary">
                      {news.category}
                    </span>
                  </div>
                  <div className="flex-grow flex items-start justify-between gap-4">
                    <p className="text-base md:text-[17px] font-bold leading-relaxed">
                      {news.title}
                    </p>
                    {isExternal && (
                      <div className="text-primary opacity-30 group-hover:opacity-100 transition-opacity shrink-0 pt-1">
                        <ExternalLink size={14} />
                      </div>
                    )}
                  </div>
                </ItemWrapper>
              );
            })}
          </div>

          <div className="flex justify-end mt-6 mb-4">
            <Link to="/news" className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
              すべて見る <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned with higher aesthetics */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden group bg-[#111] rounded-[3rem] p-12 md:p-24 shadow-2xl"
          >
            {/* Mesh Gradient / Animated Blobs for Dark Mode Look */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/20 blur-[100px] rounded-full animate-bounce-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] invert" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-primary tracking-[0.3em] uppercase mb-6 md:mb-8 border border-white/10">
                  Join the Circle
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-6 md:mb-8 leading-tight">
                  新しい循環を、<br />
                  あなたのビジネスに。
                </h2>
                <p className="text-sm md:text-l text-white/70 mb-8 md:mb-12 leading-relaxed md:leading-loose">
                  サービス開発の悩みや新規事業のアイデア。<br />
                  私たちはあなたのビジョンを<br className="md:hidden" />
                  「感謝が循環する仕組み」へと変換する、<br className="md:hidden" />
                  一番のパートナーでありたい。
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link
                    to="/contact"
                    className="group/btn relative px-10 py-5 bg-primary text-white font-black rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      お問い合わせはこちら <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-[30deg] -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-700 ease-in-out" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Decorative abstract elements */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-primary/40 rounded-full animate-ping" />
            <div className="absolute bottom-20 right-20 w-3 h-3 bg-secondary/40 rounded-full animate-bounce-slow" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
