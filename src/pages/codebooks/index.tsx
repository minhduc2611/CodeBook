// import CellList from '../../components/code-editor/cell-list';

import Link from 'next/link';
import { useEffect } from 'react';
import { useArticleListActions } from './../../client/state/hooks/useArticleListActions';
import { useTypedSelector } from './../../client/state/hooks/useTypedSelector';
import AddArticleButton from './components/add-article-button';

const CodeBook = () => {
  const { fetchArticleList } = useArticleListActions();
  const { data, loading } = useTypedSelector((state) => state.articleList);
  console.log('data', data);
  useEffect(() => {
    fetchArticleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return 'loading';
  return (
    <div>
      {data &&
        data.map((a, idx) => (
          <p key={idx}>
            <Link href={`/codebooks/${a.articleSlug}`}>{a.articleTitle}</Link>
          </p>
        ))}
      <AddArticleButton />
    </div>
  );
};

export default CodeBook;
