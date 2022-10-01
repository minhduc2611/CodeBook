import { Button } from '@mui/material';
import deepEqual from 'deep-equal';
import { FC } from 'react';
import {
  addArticle,
  updateArticle
} from 'src/client/graphql/queries-creator/articles';
import { transformStateToEntity } from 'src/client/state/reducers/article/transform';
import { ArticleState } from 'src/client/state/types/cell';
import ArticleAddInput from 'src/server/article/inputs/article-add.input';

import { useCellContext } from '../../client/state/hooks/useCellContext';
import { useUnsavedChanges } from './useUnsavedChanges';

interface DeleteArticleProps {}

const unsavedChanges = (article: ArticleState) => {
  console.table([article, article.originalArticle]);

  if (!article || !article.originalArticle) {
    return false;
  }
  let equalCellOrder = deepEqual(
    article.cellOrder,
    article.originalArticle.cellOrder
  );
  let equalTitle = deepEqual(
    article.title,
    article.originalArticle.articleTitle
  );
  let equalArticle = deepEqual(
    Object.values(article.article),
    article.originalArticle.article
  );
  let allAreEqual = equalCellOrder && equalTitle && equalArticle;
  return !allAreEqual; // article changed = all are not equal
};

const SaveArticleButton: FC<DeleteArticleProps> = () => {
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
