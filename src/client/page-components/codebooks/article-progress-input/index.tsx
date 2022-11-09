import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { FC } from 'react';

import { useCellContext } from '../../../state/hooks/useCellContext';

const ArticleProgressInput: FC = () => {
  const {
    states: article,
    actions: { updateTitleProp }
  } = useCellContext();

  const handleChange = (event: SelectChangeEvent) => {
    updateTitleProp({ progress: event.target.value });
  };
  if (article.progress == '') return <p>Loading ...</p>;
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="demo-simple-select-helper-label">Progress</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={article.progress}
        label="Category"
        onChange={handleChange}
      >
        <MenuItem value={null}>
          <em>None</em>
        </MenuItem>
        <MenuItem value={'Opened'}>Opened</MenuItem>
        <MenuItem value={'Drafting'}>Drafting</MenuItem>
        <MenuItem value={'Published'}>Published</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ArticleProgressInput;
