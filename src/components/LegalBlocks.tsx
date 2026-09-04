import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LegalBlock, LegalSection } from '../data/gachachoLegal.ts';

const SITE_ORIGIN = 'https://smartthanks.world';
const LINK_CLASS = 'text-primary underline hover:text-primary-dark break-all';

// 本文中の URL とメールアドレスをリンク化する。
// 自サイトの URL は SPA 内遷移（<Link>）にし、それ以外は通常の外部リンクにする。
const INLINE_PATTERN = /(https?:\/\/[^\s）)、。]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

const renderInline = (text: string): ReactNode => {
  const parts = text.split(INLINE_PATTERN);
  return parts.map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    if (part.includes('@') && !part.startsWith('http')) {
      return (
        <a key={i} href={`mailto:${part}`} className={LINK_CLASS}>
          {part}
        </a>
      );
    }
    if (part.startsWith(SITE_ORIGIN)) {
      const internal = part.slice(SITE_ORIGIN.length) || '/';
      return (
        <Link key={i} to={internal} className={LINK_CLASS}>
          {part}
        </Link>
      );
    }
    return (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
        {part}
      </a>
    );
  });
};

const Block = ({ block }: { block: LegalBlock }) => {
  switch (block.type) {
    case 'paragraph':
      return <p>{renderInline(block.text)}</p>;
    case 'bullets':
      return (
        <ul className="list-disc pl-6 space-y-2">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm md:text-base border-collapse">
            <thead>
              <tr className="bg-bg-soft">
                {block.header.map((h, i) => (
                  <th key={i} className="border border-border px-4 py-3 text-left font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c} className="border border-border px-4 py-3 align-top">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
};

type Props = {
  sections: LegalSection[];
};

/** 法務 JSON の sections をそのまま描画する。文言はここで一切加工しない。 */
const LegalBlocks = ({ sections }: Props) => (
  <>
    {sections.map((section, i) => (
      <section key={i}>
        <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 border-primary pl-4">
          {section.heading}
        </h2>
        <div className="space-y-4">
          {section.blocks.map((block, b) => (
            <Block key={b} block={block} />
          ))}
        </div>
      </section>
    ))}
  </>
);

export default LegalBlocks;
