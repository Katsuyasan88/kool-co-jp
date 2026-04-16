import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Users, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Service = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          const yOffset = -120; // ヘッダーの高さ分を考慮したオフセット
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  // 事業内容のデータ定義。
  // 文言の変更、項目の追加・削除はここを編集するだけで全てのセクションに反映されます。
  const services = [
    {
      id: "own-product",
      title: "自社プロダクト開発・R&D",
      tag: "OWN PRODUCT & R&D",
      desc: "「迅速な挑戦と失敗」をテーマに、ノーコード・AI駆動開発を中心とした独創的な自社サービスを展開。これまでの全開発プロジェクトは現在の技術基盤の礎となっています。",
      icon: <Smartphone className="w-8 h-8" />,
      items: [
        "LINEスタンプのAI生成サービス（開発中）",
        "AI絵本の読み聞かせプラットフォーム",
        "感謝を伝えるWebサービス",
        "お坊さんだけが返信できるSNSアプリ"
      ],
      highlights: "全サービスを自社で企画・設計・実装。クローズしたプロジェクトからも、リアルタイム通信や大規模データ処理の深い知見を蓄積しています。",
      query: "own-product"
    },
    // ... (以下同様の構造)
    {
      id: "producing",
      title: "新規事業立ち上げ支援",
      tag: "BUSINESS PRODUCING",
      desc: "コンセプト立案からプロトタイプ制作まで、伴走型で事業化をサポート。確かな実装力に基づいた現実的な提案が強みです。",
      icon: <Globe className="w-8 h-8" />,
      items: ["コンセプトメイキング", "MVP（最小機能版）開発", "グロース戦略立案"],
      cases: [
        "大手飲料会社：新サービスのプロトタイプ制作",
        "AI系スタートアップ：市場調査・戦略立案支援"
      ],
      query: "producing"
    },
    {
      id: "mentoring",
      title: "研修・メンタリング",
      tag: "MENTORING & EDUCATION",
      desc: "次世代の起業家・リーダー育成や、組織の自走を支援する研修・メンタリングを提供。現場で使える「生きた知見」を伝承します。",
      icon: <Users className="w-8 h-8" />,
      items: ["エンジニア育成プログラム", "アーキテクチャレビュー伴走", "アジャイルチームビルディング"],
      cases: [
        "受託型SIer：スタートアップ企業化支援",
        "大手自動車メーカー：新規事業創出プログラムのメンタリング"
      ],
      query: "mentoring"
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 md:mb-16 text-center"
        >
          <span className="text-secondary font-bold tracking-widest text-sm uppercase">Our Service</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-2 mb-4 leading-tight">事業概要</h1>
          <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed md:leading-loose">
            SmartThanksは、テクノロジーの力で新しい循環を創り出します。<br className="hidden md:block" />
            自社開発で得た「生きた知見」を支援事業に還元し、<br className="hidden md:block" />
            クライアント様と共に成長するエコシステムを構築しています。
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          {/* Own Product - Highlighted Section */}
          <motion.div
            id="own-product"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative bg-[#fdf8f0] border border-primary/10 rounded-[3rem] p-8 md:p-16 overflow-hidden"
          >
            <div className="absolute right-[-10%] top-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1">
                <span className="px-4 py-1.5 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-widest mb-6 inline-block">
                  {services[0].tag}
                </span>
                <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                  {services[0].title}
                </h2>
                <p className="text-text-muted text-base md:text-lg mb-4 leading-relaxed md:leading-loose">{services[0].desc}</p>
                <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-white mb-4">
                  <p className="font-bold text-primary mb-3">R&D Background</p>
                  <p className="text-sm text-text-muted italic">
                    「{services[0].highlights}」
                  </p>
                </div>
                <ul className="space-y-2">
                  {services[0].items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                      <span className="font-bold text-sm text-text-main">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact?type=own-product" className="btn btn-outline w-full text-center lg:w-fit px-12 mt-8">
                  この事業について問い合わせる
                </Link>
              </div>
              <div className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-sm aspect-square gradient-bg rounded-[3rem] shadow-2xl flex items-center justify-center float-anim">
                  <Smartphone className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Producing & Mentoring */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.slice(1).map((service, idx) => (
              <motion.div
                key={idx}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-bg-soft border border-border p-10 md:p-14 rounded-[3rem] hover:shadow-2xl hover:border-primary/20 transition-all flex flex-col"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-8">
                  {service.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{service.title}</h2>
                <p className="text-text-muted mb-4 text-base md:text-lg flex-grow leading-relaxed md:leading-loose">{service.desc}</p>

                <div className="space-y-2 mb-4 pt-8 border-t border-border">
                  <p className="text-xs font-bold text-primary tracking-widest uppercase">Related Records</p>
                  {service.cases?.map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <ArrowRight size={16} className="mt-1 text-primary shrink-0" />
                      <span className="text-sm font-bold">{c}</span>
                    </div>
                  ))}
                </div>

                <Link to={`/contact?type=${service.query}`} className="btn btn-outline w-full text-center">
                  この事業について問い合わせる
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
