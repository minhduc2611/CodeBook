import { GetServerSideProps } from 'next';
import Error from 'next/error';
import { FC } from 'react';

import { AppApolloClient } from 'src/client/graphql/client';
import {
  FetchOneArticleQuery,
  FetchOneArticleResult
} from 'src/client/graphql/queries/articles';
import { Article } from 'src/server/article/entities/article.entity';
import CellList from '../../client/components/code-editor/cell-list';
import CellProvider from '../../client/state/hooks/useCellContext';
import DeleteArticleButton from './DeleteArticleButton';
import SaveArticleButton from './SaveArticleButton';
type CodeBookDetailProps = {
  article: Article;
  errorCode: number
};

const CodeBookDetail: FC<CodeBookDetailProps> = ({ article, errorCode }) => {
  if (errorCode !== 200) {
    return <Error statusCode={errorCode} />
  }
  return (
    <div>
      <CellProvider article={article}>
        <CellList />
        <DeleteArticleButton/>
        <SaveArticleButton/>
        
        {/* <AddArticle />
        <SaveArticle /> */}
      </CellProvider>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  CodeBookDetailProps
> = async (ctx) => {
  const slug = ctx.query.slug;
  try {
    let { data } = await AppApolloClient.query<FetchOneArticleResult>({
      query: FetchOneArticleQuery,
      variables: { articleSlug: slug }
    });
  return { props: { article: data.article,  errorCode: 200 } };

  } catch (error) {
    console.log('error', error);
    return { props: { errorCode: 404, article: {} as Article } };
  }
};

export default CodeBookDetail;
