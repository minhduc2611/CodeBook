import { Button, IconButton } from '@mui/material';
import deepEqual from 'deep-equal';
import { FC } from 'react';
import toast from 'react-hot-toast';
import {
  addArticle,
  updateArticle
} from '../../../../client/graphql/queries-creator/articles';
import { transformStateToEntity } from '../../../../client/state/reducers/article/transform';
import ArticleAddInput from '../../../../server/article/inputs/article-add.input';

import { useRouter } from 'next/router';
import { useService } from '../../../../client/hooks';
import { useCellContext } from '../../../../client/state/hooks/useCellContext';
import { ArticleState } from '../../../../client/state/types/entities/article';
import { UnsavedChanges } from './UnsavedChanges';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
const unsavedChanges = (article: ArticleState) => {
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
  const equalCategory = deepEqual(
    article.category,
    article.originalArticle.category
  );
  const equalProgress = deepEqual(
    article.progress,
    article.originalArticle.progress
  );
  const equalArticle = deepEqual(
    Object.values(article.article),
    article.originalArticle.article
  );
  const allAreEqual =
    equalCellOrder &&
    equalCategory &&
    equalProgress &&
    equalTitle &&
    equalArticle;
  return !allAreEqual; // article changed = all are not equal
};

const SaveArticleButton: FC = () => {
  const {
    states: article,
    actions: { updateCells }
  } = useCellContext();

  const router = useRouter();

  const unsavedChangesService = useService(
    new UnsavedChanges('Changes aren\'t saved, do you want to leave?', router)
  );
  // console.log('unsavedChanges', unsavedChanges(article));
  // // useUnsavedChanges(() => unsavedChanges(article));

  unsavedChangesService.hook(() => unsavedChanges(article));

  const handleSaveArticle = async () => {
    try {
      const saveOrAddArticle: ArticleAddInput = transformStateToEntity<
        ArticleState,
        ArticleAddInput
      >(article);
      if (article.id) {
        await updateArticle(article.id, saveOrAddArticle);
      } else {
        console.log('saveOrAddArticle', saveOrAddArticle);

        await addArticle(saveOrAddArticle);
      }

      await updateCells({ ...article.originalArticle, ...saveOrAddArticle });
      console.log('handleSaveArticle unsavedChanges', unsavedChanges(article));

      unsavedChangesService.push('/codebooks');
      toast('Save Successfully');
    } catch (error) {}
  };
  return (
    <div>
      <IconButton
        style={{ position: 'fixed', right: '140px', bottom: '10px' }}
        color="info"
        aria-label="save"
        size="large"
        disabled={!unsavedChanges(article)} // disabled when nothing changed
        onClick={handleSaveArticle}
      >
        <SaveRoundedIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SaveArticleButton;
