import { Button } from '@mui/material';
import { FC } from 'react';
import { deleteArticle } from '../../../../client/graphql/queries-creator/articles';

import { useCellContext } from '../../../../client/state/hooks/useCellContext';

const DeleteArticleButton: FC = () => {
  const {
    states: { id }
  } = useCellContext();

  return (
    <div>
      <Button
        href="/codebooks"
        onClick={(event) => {
          if (!confirm('delete this article')) {
            event.preventDefault();
          } else {
            deleteArticle(id);
          }
        }}
      >
        Delete Article
      </Button>
    </div>
  );
};

export default DeleteArticleButton;
