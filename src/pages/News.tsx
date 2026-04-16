import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import newsData from '../data/news.json';

const News = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-4xl font-extrabold mb-6">ニュース</h1>
          <p className="text-text-muted text-lg">株式会社SmartThanksの最新情報をお届けします。</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {newsData.map((news, idx) => {
            const isExternal = !!news.url;
            const CardWrapper = isExternal ? 'a' : 'div';
            const wrapperProps = isExternal ? {
              href: news.url,
              target: "_blank",
              rel: "noopener noreferrer"
            } : {};

            return (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <CardWrapper
                  {...wrapperProps}
                  className={`block bg-white border border-border p-6 md:p-8 rounded-2xl transition-all duration-300 ${isExternal ? 'hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 relative">
                    <div className="flex items-center gap-4 md:w-56 shrink-0 pt-1">
                      <span className="text-text-muted font-bold w-24 shrink-0">{news.date}</span>
                      <span className="text-xs px-2 py-1 bg-bg-soft rounded border border-border text-primary font-medium">
                        {news.category}
                      </span>
                    </div>
                    <div className="flex-grow flex items-start justify-between gap-6">
                      <h2 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
                        {news.title}
                      </h2>
                      {isExternal && (
                        <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 pt-2">
                          <ExternalLink size={18} />
                        </div>
                      )}
                    </div>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {newsData.length === 0 && (
          <div className="text-center py-20 bg-bg-soft rounded-3xl border border-dashed border-border">
            <p className="text-text-muted">現在お知らせはありません。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
