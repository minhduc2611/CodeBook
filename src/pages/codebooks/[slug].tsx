import Error from 'next/error';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { fetchOneArticleBySlug } from 'src/client/graphql/queries-creator/articles';
import CellProvider from '../../client/state/hooks/useCellContext';
import ArticleTitleInput from './../../client/page-components/codebooks/article-title-input';
import CellList from './../../client/page-components/codebooks/cell-list/cell-list';
import DeleteArticleButton from './../../client/page-components/codebooks/delete-article-button';
import SaveArticleButton from './../../client/page-components/codebooks/save-article-button';
import { Article } from './../../server/article/entities/article.entity';

const CodeBookDetail: FC = () => {
  const router = useRouter();
  const [errorCode, setErrorCode] = useState(200);
  const [article, setArticle] = useState<Article>(null);
  useEffect(() => {
    const slug = router.query.slug as string;
    console.log('ua alo ?', slug);
    if (!slug) return;
    (async () => {
      console.log('slug', slug);
      if (slug === 'new') {
        // const article = deserializedClass(new Article());
        // setArticle(article);
      } else {
        try {
          const articleData = await fetchOneArticleBySlug(slug);
          console.log('articleData????', articleData);
          
          setArticle(articleData);
        } catch (error) {
          setArticle({} as Article);
          setErrorCode(404);
        }
      }
    })();
  }, [router.query.slug]);
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

// export const getServerSideProps: GetServerSideProps<
//   CodeBookDetailProps
// > = async (ctx) => {
//   const slug = ctx.params.slug as string;
//   const id = Math.random();
//   console.log('slug' + id, slug);

//   const article = deserializedClass(new Article());
//   console.log('getServerSideProps', id);
//   if (slug === 'new') {
//     return { props: { article: article as Article, errorCode: 200 } };
//   }

//   try {
//     const articleData = await fetchOneArticleBySlug(slug);

//     console.log('getServerSideProps, articleData', id, articleData.article);

//     return { props: { article: articleData, errorCode: 200 } };
//   } catch (error) {
//     console.log('error', error);
//     return {
//       props: { errorCode: 404, article: {} as Article },
//       revalidate: 10
//     };
//   }
// };

export default CodeBookDetail;
