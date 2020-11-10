import { useRef, useEffect } from 'react';
// Refs provide a way to access the actual DOM nodes of rendered React elements.

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
};
