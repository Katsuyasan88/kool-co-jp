import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import newsData from '../../data/news.json';

const NewsSection = () => {
  return (
    <section className="section bg-white">
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
  );
};

export default NewsSection;
