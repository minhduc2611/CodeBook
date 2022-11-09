import { Button, IconButton } from '@mui/material';
import { FC } from 'react';
import { deleteArticle } from '../../../../client/graphql/queries-creator/articles';

import { useCellContext } from '../../../../client/state/hooks/useCellContext';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteArticleButton: FC = () => {
  const {
    states: { id }
  } = useCellContext();

  return (
    <div>
            <IconButton
        style={{ position: 'fixed', right: '70px', bottom: '10px' }}
        color="secondary"
        aria-label="delete"
        size="large"
        href="/codebooks"
        onClick={(event) => {
          if (!confirm('delete this article')) {
            event.preventDefault();
          } else {
            deleteArticle(id);
          }
        }}
      >
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default DeleteArticleButton;
