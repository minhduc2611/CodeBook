// import CellList from '../../components/code-editor/cell-list';

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Article } from 'src/server/article/entities/article.entity';
import AddArticleButton from './AddArticleButton';
// import CellProvider from '../../state/hooks/useCellContext';
const FetchAllArticleQuery = gql`
  query {
    articles {
      _id
      cellOrder
      articleTitle
      articleSlug
      article {
        content
        id
        type
      }
    }
  }
`;
type ResponseArticles = {
  articles : Article[]
}
const CodeBook = () => {
  const { called, loading, data } = useQuery<ResponseArticles>(FetchAllArticleQuery, {});
  // const [loadGreeting, { called, loading, data }] = useLazyQuery(FetchUserQuery, {})
  console.log('data', data);
  if (loading) return 'loading';
  return (
    <div>
      {data.articles.map((a, idx) => (
        <p key={idx}>
          <Link href={`/codebooks/${a.articleSlug}`}>{a.articleTitle}</Link>
        </p>
      ))}
      <AddArticleButton />
    </div>
  );
};

export default CodeBook;
