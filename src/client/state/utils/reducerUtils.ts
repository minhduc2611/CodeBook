import { Dispatch } from 'react';

export function bindsActionCreatorsWithDispatch<T, M extends Dispatch<any>>(
  _modules: T,
  dispatch: M
): T {
  const result = {} as T;
  Object.entries(_modules).forEach((_function) => {
    result[_function[0]] = (...agrs) => dispatch(_function[1](...agrs));
  });
  result['getType'] = () => typeof result;
  return result;
}

export function arrayToObject<T>(
  theArray: T[],
  by: string
): { [key: string]: T } {
  let final = {};

  if (Object.entries(theArray).length === 0) {
    return final;
  }

  if (theArray) {
    theArray.forEach((_object: T) => {
      final[_object[by]] = { ..._object } as T;
    });
    return final;
  }
  return null;
}
