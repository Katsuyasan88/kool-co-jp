import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
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
                    お問い合わせ <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
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
  );
};

export default CTASection;
