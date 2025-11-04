import type { Ref } from 'react';

export type MaybeRef<T> = Ref<T> | null | undefined;

export const mergeRefs = <T extends unknown>(...refs: MaybeRef<T>[]) => {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') return ref(node);
      if (ref?.current) ref.current = node;
    });
  };
};
