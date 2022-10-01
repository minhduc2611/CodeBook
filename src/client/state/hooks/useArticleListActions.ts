import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { articleListActions } from '../reducers';

export const useArticleListActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(articleListActions, dispatch);
};
