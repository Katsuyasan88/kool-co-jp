import { Navigate, useLocation } from 'react-router-dom';

/**
 * 旧 URL `/terms` から公式の利用規約 URL `/gachacho/terms` への後方互換リダイレクト。
 *
 * 公開中の iOS version 1.0.1 / build 9 が旧 URL を参照しているため残している。
 * 本文はここに置かず、クエリとハッシュはそのまま引き継ぐ。
 */
const LegacyTermsRedirect = () => {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: '/gachacho/terms', search, hash }} replace />;
};

export default LegacyTermsRedirect;
