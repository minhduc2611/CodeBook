import { useRef } from 'react';

function useService<T>(service: T) {
  const unsavedChangesService = useRef(service);
  return unsavedChangesService.current;
}

export default useService;
