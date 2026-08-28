import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle.ts';

const NotFound = () => {
  usePageTitle("ページが見つかりません");

  return (
    <div className="pt-32 pb-20 min-h-[70vh] flex items-center">
      <div className="container text-center">
        <p className="text-8xl font-extrabold gradient-text mb-6">404</p>
        <h1 className="text-2xl md:text-4xl font-bold mb-4">ページが見つかりません</h1>
        <p className="text-text-muted mb-10">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link to="/" className="btn btn-primary flex items-center gap-2 mx-auto w-fit">
          トップページへ戻る <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
