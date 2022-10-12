import { Button } from '@mui/material';
import deepEqual from 'deep-equal';
import { FC } from 'react';
import {
  addArticle,
  updateArticle
} from '../../../../client/graphql/queries-creator/articles';
import { transformStateToEntity } from '../../../../client/state/reducers/article/transform';
import ArticleAddInput from '../../../../server/article/inputs/article-add.input';

import { useUnsavedChanges } from '../../../../client/hooks';
import { useCellContext } from '../../../../client/state/hooks/useCellContext';
import { ArticleState } from '../../../../client/state/types/entities/article';

const unsavedChanges = (article: ArticleState) => {
  console.table([article, article.originalArticle]);

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

const SaveArticleButton: FC = () => {
  const {
    states: article,
    actions: { updateCells }
  } = useCellContext();

  useUnsavedChanges(() => unsavedChanges(article));

  const handleSaveArticle = async () => {
    console.log('article.originalArticle', article.originalArticle);
    console.log('article', article);
    try {
      const saveOrAddArticle: ArticleAddInput = transformStateToEntity<
        ArticleState,
        ArticleAddInput
      >(article);
      if (article.id) {
        await updateArticle(article.id, saveOrAddArticle);
      } else {
        await addArticle(saveOrAddArticle);
      }

      updateCells({ ...article.originalArticle, ...saveOrAddArticle });
    } catch (error) {}
  };
  return (
    <div>
      <Button
        // href="/codebooks"
        disabled={!unsavedChanges(article)} // disabled when nothing changed
        onClick={handleSaveArticle}
      >
        Save Article
      </Button>
    </div>
  );
};

export default SaveArticleButton;
