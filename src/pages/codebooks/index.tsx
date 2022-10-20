// import CellList from '../../components/code-editor/cell-list';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CodeCell } from 'src/client/components';
import AddArticleButton from './../../client/page-components/codebooks/add-article-button';
import { useArticleListActions } from './../../client/state/hooks/useArticleListActions';
import { useTypedSelector } from './../../client/state/hooks/useTypedSelector';

const CodeBook = () => {
  const { fetchArticleList } = useArticleListActions();
  const { data, loading } = useTypedSelector((state) => state.articleList);

  const [code, setCode] = useState('');
  console.log('data', data);
  console.log('env', process.env);
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

      <CodeCell initialValue={code} onChange={setCode} />
      <AddArticleButton />
    </div>
  );
};

export default CodeBook;
