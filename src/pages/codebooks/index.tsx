// import CellList from '../../components/code-editor/cell-list';

import { Typography, Chip } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import AddArticleButton from './../../client/page-components/codebooks/add-article-button';
import { useArticleListActions } from './../../client/state/hooks/useArticleListActions';
import { useTypedSelector } from './../../client/state/hooks/useTypedSelector';

const CodeBook = () => {
  const { fetchArticleList } = useArticleListActions();
  const { data, loading } = useTypedSelector((state) => state.articleList);

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
            <Typography mt={2}>
              <Link href={`/codebooks/${a.articleSlug}`}>{a.articleTitle}</Link>
              {a.category && (
                <Chip style={{ marginLeft: '10px' }} label={a.category} />
              )}
            </Typography>
          </p>
        ))}
      <AddArticleButton />
    </div>
  );
};

export default CodeBook;
