import { Article } from 'src/server/article/entities/article.entity';
import ArticleAddInput from 'src/server/article/inputs/article-add.input';
import { ArticleState, Cell } from '../../types/cell';
import { arrayToObject } from '../../utils/reducerUtils';

export function transform<A extends Article, AS extends ArticleState>(
  article: A
) {
  let state = {} as AS;
  console.log('article 1', article);
  console.log('article 1.1', article.article);
  console.log('article 2', Object.entries(article.article).length);

//   if (Object.entries(article.article).length === 0) {
//     console.log('article 3', article);
//     state.originalArticle = article;
//     return state;
//   }

  state.cellOrder = article.cellOrder;
  state.id = article._id;
  state.title = article.articleTitle;
  state.slug = article.articleSlug;
  state.article = arrayToObject<Cell>(article.article, 'id');
  state.originalArticle = article;
  console.log('transformed', state);

  return state;
}

export function transformStateToEntity<
  AS extends ArticleState,
  A extends ArticleAddInput
>(articleState: AS) {
  let article = {} as A;
  article.article = Object.values(articleState.article).map(
    ({ id, type, content }) => ({ id, type, content })
  );
  article.cellOrder = articleState.cellOrder;
  article.articleTitle = articleState.title;
  // article._id = articleState.id;
  // article.articleSlug = articleState.slug;
  console.log('transformed', article);
  return article;
}
