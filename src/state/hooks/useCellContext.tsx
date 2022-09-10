import React, { useContext, useMemo, useReducer } from 'react';
import { cellActionCreators } from '..';
import { CellReducer } from '../state-system/reducers';
import { CellContext } from '../stores/context/cellContext';
import { CellsState } from '../types/cell';
import { bindsActionCreatorsWithDispatch } from '../utils/reducerUtils';

interface contextProps {
  states: CellsState;
  actions: typeof cellActionCreators;
}

/** Get States and Actions */
export const useCellContext = () => useContext<contextProps>(CellContext);

/** Wrapper  */
const CellProvider: React.FC<any> = ({ children }) => {
  const [states, dispatch] = useReducer(
    CellReducer.default,
    CellReducer.initialState
  );
  const actions = useMemo(
    () => bindsActionCreatorsWithDispatch(cellActionCreators, dispatch),
    []
  );

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
