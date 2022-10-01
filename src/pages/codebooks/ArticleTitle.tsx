import { FC } from 'react';

import TextField from '@mui/material/TextField';
import { useCellContext } from 'src/client/state/hooks/useCellContext';

const ArticleTitle: FC = () => {
  const {
    states: article,
    actions: { updateArticleTitle }
  } = useCellContext();

  return (
    <TextField
      autoFocus
      margin="dense"
      id="article-title"
      label="Article Title"
      type="text"
      fullWidth
      value={article.title}
      onChange={(e) => updateArticleTitle(e.target.value)}
      variant="standard"
    />
  );
};

export default ArticleTitle;
