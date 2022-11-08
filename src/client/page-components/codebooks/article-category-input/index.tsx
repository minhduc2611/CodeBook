import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { FC } from 'react';

import { useCellContext } from '../../../state/hooks/useCellContext';

const ArticleCategoryInput: FC = () => {
  const {
    states: article,
    actions: { updateTitleProp }
  } = useCellContext();

  const handleChange = (event: SelectChangeEvent) => {
    updateTitleProp({ category: event.target.value });
  };
  if (article.category == '') return <p>Loading ...</p>;
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={article.category}
        label="Category"
        onChange={handleChange}
      >
        <MenuItem value={null}>
          <em>None</em>
        </MenuItem>
        <MenuItem value={'ReactJs'}>ReactJs</MenuItem>
        <MenuItem value={'Solidity'}>Solidity</MenuItem>
        <MenuItem value={'Javascript'}>Javascript</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ArticleCategoryInput;
