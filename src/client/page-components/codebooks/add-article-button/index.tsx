import { Button, IconButton } from '@mui/material';
import { FC } from 'react';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
const AddArticleButton: FC = () => {
  return (
    <div className="fixed">
      <IconButton
        style={{ position: 'fixed', right: '100px', bottom: '10px' }}
        color="info"
        href="/codebooks/new"
        aria-label="delete"
        size="large"
      >
        <AddCircleOutlineRoundedIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default AddArticleButton;
