import { GetServerSideProps } from 'next';
import Error from 'next/error';
import { FC } from 'react';
import CellProvider from '../../client/state/hooks/useCellContext';
import { AppApolloClient } from './../..//client/graphql/client';
import {
  FetchOneArticleQuery,
  FetchOneArticleResult
} from './../../client/graphql/queries/articles';
import { Article } from './../../server/article/entities/article.entity';
import ArticleTitleInput from './components/article-title-input';
import CellList from './components/cell-list/cell-list';
import DeleteArticleButton from './components/delete-article-button';
import SaveArticleButton from './components/save-article-butotn';
type CodeBookDetailProps = {
  article: Article;
  errorCode: number;
};

const CodeBookDetail: FC<CodeBookDetailProps> = ({ article, errorCode }) => {
  if (errorCode !== 200) {
    return <Error statusCode={errorCode} />;
  }
  return (
    <div>
      <CellProvider article={article}>
        <ArticleTitleInput />
        <CellList />
        <DeleteArticleButton />
        <SaveArticleButton />
      </CellProvider>
    </div>
  );
};
const deserializedClass = (cls) => {
  return JSON.parse(JSON.stringify(cls));
};
export const getServerSideProps: GetServerSideProps<
  CodeBookDetailProps
> = async (ctx) => {
  const slug = ctx.query.slug;
  console.log('slug', slug);

  let a = deserializedClass(new Article());
  console.log('slug ======== a Article', a);
  if (slug === 'new') {
    return { props: { article: a as Article, errorCode: 200 } };
  }

  try {
    let { data } = await AppApolloClient.query<FetchOneArticleResult>({
      query: FetchOneArticleQuery,
      variables: { articleSlug: slug }
    });
    return { props: { article: data.article, errorCode: 200 } };
  } catch (error) {
    console.log('error', error);
    return { props: { errorCode: 404, article: {} as Article } };
  }
};

export default CodeBookDetail;
