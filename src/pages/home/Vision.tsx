import { motion } from 'framer-motion';
import { User, CheckCircle } from 'lucide-react';

const Vision = () => {
  return (
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
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
