import { motion } from 'framer-motion';
import { Rocket, Heart, Award, CheckCircle } from 'lucide-react';

const Company = () => {
  const companyInfo = [
    { label: "社名", value: "株式会社SmartThanks" },
    { label: "設立", value: "2019年2月" },
    { label: "所在地", value: "〒791-8042 愛媛県松山市" },
    {
      label: "事業内容", value: [
        "インターネットサービス企画・開発・運営",
        "新規事業立ち上げ支援",
        "研修・メンタリング",
        "IT/経営コンサルティング",
        "システム開発受託"
      ]
    },
    { label: "代表取締役", value: "武智 勝哉" },
    { label: "公式サイト", value: "smartthanks.world" },
    { label: "保有ドメイン", value: "smartthanks.world / kool.co.jp" }
  ];

  const history = [
    // ...
    { year: "2019.02", event: "株式会社くうる 設立" },
    { year: "2020.05", event: "ノーコードアプリの社会実装を本格始動" },
    { year: "2020.12", event: "お坊さんアプリ「Sion」リリース" },
    { year: "2021.08", event: "法人向け新規事業立ち上げ支援事業を本格始動" },
    { year: "2022.04", event: "新感覚チップサービス「SmartThanks」をリリース" },
    { year: "2022.08", event: "株式会社SmartThanksに商号変更" },
    { year: "2025.04", event: "AI駆動開発を本格始動" }
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-24">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">About Us</span>
            <h1 className="text-4xl md:text-4xl font-extrabold mt-4 mb-8">会社概要</h1>
            <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
          </div>

          {/* Mission & Vision Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            <motion.div
              whileHover={{ y: -5 }}
              className="relative p-12 pr-16 rounded-[3rem] bg-bg-soft border border-border overflow-hidden group min-h-[320px] flex flex-col"
            >
              {/* Ghost Text */}
              <div className="absolute top-6 left-28 text-8xl font-black text-primary/10 pointer-events-none select-none uppercase tracking-tighter leading-none">
                Mission
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between h-[80px] mb-8">
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shrink-0">
                    <Rocket size={24} />
                  </div>
                </div>
                <h3 className="text-2xl md:text-xl font-black mb-6 leading-tight">
                  テクノロジーを迅速に社会へ供給する
                </h3>
                <p className="text-text-muted text-base">
                  成功だけではなく、自社で培った失敗の経験を活かして最新技術の迅速な社会実装を試みます。
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="relative p-12 pr-16 rounded-[3rem] bg-bg-soft border border-border overflow-hidden group min-h-[320px] flex flex-col"
            >
              {/* Ghost Text */}
              <div className="absolute top-6 left-28 text-8xl font-black text-secondary/40 pointer-events-none select-none uppercase tracking-tighter leading-none">
                Vision
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between h-[80px] mb-8">
                  <div className="w-12 h-12 bg-secondary text-primary rounded-xl flex items-center justify-center shadow-lg shrink-0">
                    <CheckCircle size={24} />
                  </div>
                </div>
                <h3 className="text-2xl md:text-xl font-black mb-6 leading-tight">
                  知恵と感謝が循環する社会へ
                </h3>
                <p className="text-text-muted text-base">
                  テクノロジーの活用によって生まれる強い心臓で、新しい価値が循環する血の通った社会を実現します。
                </p>
              </div>
            </motion.div>
          </div>

          {/* Company Table */}
          <div className="bg-white border border-border rounded-[3rem] p-8 md:p-16 mb-32 shadow-2xl shadow-primary/5">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="w-2 h-10 bg-primary rounded-full" />
              Corporate Profile
            </h2>
            <div className="overflow-hidden">
              <table className="w-full text-left">
                <tbody>
                  {companyInfo.map((info, idx) => (
                    <tr key={idx} className="border-b border-border last:border-0 group">
                      <th className="py-8 px-4 w-1/3 text-text-muted font-bold text-sm tracking-wider uppercase group-hover:text-primary transition-colors align-top">{info.label}</th>
                      <td className="py-8 px-6 text-lg font-medium align-top">
                        {Array.isArray(info.value) ? (
                          <ul className="space-y-2">
                            {info.value.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1.5 shrink-0">・</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          info.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* History Timeline */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-16 text-center">沿革</h2>
            <div className="relative max-w-3xl mx-auto pl-8 border-l-2 border-border space-y-16">
              {history.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] bg-white border-4 border-primary rounded-full shadow-sm" />
                  <span className="text-primary font-bold font-mono tracking-tighter mb-2 block">{h.year}</span>
                  <p className="text-xl font-bold text-text-main leading-tight">{h.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Company;
