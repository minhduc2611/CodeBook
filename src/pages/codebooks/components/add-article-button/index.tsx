import { Button } from '@mui/material';
import deepEqual from 'deep-equal';
import React, { FC } from 'react';
import { ArticleState } from '../../../../client/state/types/cell';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface DeleteArticleProps {}

const unsavedChanges = (article: ArticleState) => {
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

const AddArticleButton: FC<DeleteArticleProps> = () => {
  // const { states: article, actions : {updateCells} } = useCellContext();

  // useUnsavedChanges(() => unsavedChanges(article));

  // const handleSaveArticle = async () => {
  //   console.log('article.originalArticle', article.originalArticle);
  //   console.log('article', article);
  //   try {
  //     const saveArticle: ArticleAddInput = transformStateToEntity<ArticleState, ArticleAddInput>(article);
  //     await updateArticle(article.id, saveArticle)
  //     updateCells({...article.originalArticle, ...saveArticle})
  //   } catch (error) {

  //   }

  // }
  const [open, setOpen] = React.useState(false);
  const [articleTitle, setArticleTitle] = React.useState('');

  const handleClickOpen = () => {

    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button
          href="/codebooks/new"
          // disabled={!unsavedChanges(article)} // disabled when nothing changed
          // onClick={handleSaveArticle}
          // onClick={handleClickOpen}
        >
          Add Article
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
        <DialogTitle>Article Title</DialogTitle>
        <DialogContent>
          <DialogContentText>What is your article title ?</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="article-title"
            label="Article Title"
            type="text"
            fullWidth
            
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            // TODOs: add validations.
          }}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddArticleButton;
