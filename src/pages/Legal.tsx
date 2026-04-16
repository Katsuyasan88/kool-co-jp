import { motion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle.ts';

const Legal = () => {
  usePageTitle("特定商取引法に基づく表記");
  const info = [
    { label: "販売業者", value: "株式会社SmartThanks" },
    { label: "代表責任者", value: "武智 勝哉" },
    { label: "所在地", value: "〒791-8042 愛媛県松山市" },
    { label: "お問い合わせ先", value: "お問い合わせフォームよりご連絡ください。" },
    { label: "販売価格", value: "各サービス・プランごとに表示された価格に基づきます。" },
    { label: "商品代金以外の必要料金", value: "消費税、振込手数料（銀行振込の場合）、インターネット接続料金その他の電気通信回線の通信に関する費用（価格は、お客様が契約した各通信事業者が定める料金によります）。" },
    { label: "引き渡し時期", value: "お支払い手続き完了後、直ちにご利用いただけます。" },
    { label: "お支払方法", value: "クレジットカード決済、銀行振込" },
    { label: "返品・交換・キャンセル", value: "デジタルコンテンツおよびサービスの性質上、決済完了後の返品・返金・キャンセルには応じられません。" },
    { label: "動作環境", value: "本サービスを利用するために必要なOSやブラウザ等の環境は、各サービスの案内ページをご確認ください。" }
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">Legal</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-8">特定商取引法に基づく表記</h1>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="bg-bg-soft border border-border rounded-[2rem] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <tbody>
                {info.map((item, idx) => (
                  <tr key={idx} className="border-b border-border last:border-0 group flex flex-col md:table-row">
                    <th className="py-4 md:py-6 px-6 md:px-8 bg-white/50 md:w-1/3 text-text-muted font-bold text-xs md:text-sm tracking-wider uppercase group-hover:text-primary transition-colors align-top md:border-r border-border">
                      {item.label}
                    </th>
                    <td className="py-4 md:py-6 px-6 md:px-8 text-sm md:text-base font-medium align-top leading-relaxed">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-12 text-sm text-text-muted leading-relaxed">
            <p>※サービスの詳細や個別のお取引条件については、各サービスのご利用規約またはお見積書等をご確認ください。</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal;
