import { useRef, useCallback } from 'react';

export function useEvent<T extends (...args: any[]) => void>(fn?: T) {
  const ref = useRef(fn || (() => {}));
  ref.current = fn || (() => {});

  return useCallback((...args: Parameters<T>) => {
    return ref.current(...args);
  }, []);
}
