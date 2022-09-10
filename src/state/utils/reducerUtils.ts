import { Dispatch } from 'react';

export function bindsActionCreatorsWithDispatch<T, M extends Dispatch<any>>(
  _modules: T,
  dispatch: M
) {
  const result = {} as T;
  Object.entries(_modules).forEach((_function) => {
    result[_function[0]] = (...agrs) => dispatch(_function[1](...agrs));
  });
  result['getType'] = () => typeof result;
  return result;
}
