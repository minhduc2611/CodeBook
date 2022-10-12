import { GetServerSideProps } from 'next';
import Error from 'next/error';
import { FC } from 'react';
import { fetchOneArticleBySlug } from 'src/client/graphql/queries-creator/articles';
import CellProvider from '../../client/state/hooks/useCellContext';
import ArticleTitleInput from './../../client/page-components/codebooks/article-title-input';
import CellList from './../../client/page-components/codebooks/cell-list/cell-list';
import DeleteArticleButton from './../../client/page-components/codebooks/delete-article-button';
import SaveArticleButton from './../../client/page-components/codebooks/save-article-button';
import { Article } from './../../server/article/entities/article.entity';
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
const deserializedClass = (cls: any) => {
  return JSON.parse(JSON.stringify(cls));
};
export const getServerSideProps: GetServerSideProps<
  CodeBookDetailProps
> = async (ctx) => {
  const slug = ctx.query.slug as string;
  const article = deserializedClass(new Article());
  if (slug === 'new') {
    return { props: { article: article as Article, errorCode: 200 } };
  }

  try {
    const articleData = await fetchOneArticleBySlug(slug);
    return { props: { article: articleData, errorCode: 200 } };
  } catch (error) {
    console.log('error', error);
    return { props: { errorCode: 404, article: {} as Article } };
  }
};

export default CodeBookDetail;
