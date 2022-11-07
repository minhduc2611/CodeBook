import deepEqual from 'deepEqual';
import { ArticleState } from '../../types/entities/article';

export const unsavedChanges = (article: ArticleState) => {
  if (!article || !article.originalArticle) {
    return false;
  }
  const equalCellOrder = deepEqual(
    article.cellOrder,
    article.originalArticle.cellOrder
  );
  const equalTitle = deepEqual(
    article.title,
    article.originalArticle.articleTitle
  );
  const equalArticle = deepEqual(
    Object.values(article.article),
    article.originalArticle.article
  );
  const allAreEqual = equalCellOrder && equalTitle && equalArticle;
  return !allAreEqual; // article changed = all are not equal
};
