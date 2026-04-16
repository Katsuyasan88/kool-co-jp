import { motion } from 'framer-motion';

const Achievements = () => {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
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
              initial={{ opacity: 1, scale: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
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
  );
};

export default Achievements;
