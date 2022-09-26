import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../state-system/reducers';

/** get redux states */
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
