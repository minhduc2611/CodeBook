import React, { useContext, useEffect, useMemo, useReducer } from 'react';
import { cellActionCreators } from '..';
import { CellReducer } from '../reducers';
import { CellContext } from '../stores/context/cell.context';
import { ArticleState } from '../types/cell';
import { bindsActionCreatorsWithDispatch } from '../utils/reducerUtils';

interface contextProps {
  states: ArticleState;
  actions: typeof cellActionCreators;
}

// let { data } = await AppApolloClient.query({
//   query: FetchUserQuery
// });
// console.log('result data', data);
/** Get States and Actions */
export const useCellContext = () => useContext<contextProps>(CellContext);

/** Wrapper  */
const CellProvider: React.FC<any> = ({ children, article }) => {
  // const { called, loading, data } = useQuery<getOneArticleQuery>(FetchUserQuery, {
  //   variables: { id: articleId, articleSlug  }
  // });

  const [states, dispatch] = useReducer(
    CellReducer.default,
    CellReducer.initialState
  );
  const actions = useMemo(
    () => bindsActionCreatorsWithDispatch(cellActionCreators, dispatch),
    []
  );

  // good article talking about async middleware
  useEffect(() => {
    if (article) {
      actions.setCells(article);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);
  // useEffect(() => {
  //   console.log('articleId', articleId);
  //   console.log('articleId data', data);
  //   if (data && data.article) {
  //     actions.setCells(data.article);
  //     console.log('cells set', data.article);
  //   }
  // }, [articleId, data]);

  return (
    <CellContext.Provider
      value={{
        states,
        actions
      }}
    >
      {children}
    </CellContext.Provider>
  );
};

export default CellProvider;
