import { ArticleState } from '../../types/entities/article';
import { Cell } from '../../types/entities/cell';
import { arrayToObject } from '../../utils/reducerUtils';
import { Article } from './../../../../server/article/entities/article.entity';
import ArticleAddInput from './../../../../server/article/inputs/article-add.input';

export function transform<A extends Article, AS extends ArticleState>(
  article: A
) {
  const state = {} as AS;
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
  return state;
}

export function transformStateToEntity<
  AS extends ArticleState,
  A extends ArticleAddInput
>(articleState: AS) {
  const article = {} as A;
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
