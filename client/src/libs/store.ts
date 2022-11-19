import { useEffect, useState } from "react";

const createStore = <T>(initialState: T) => {
  let store = initialState ?? ({} as T);
  const listeners = new Set<(store: T) => void>();

  const getState = () => store;

  const subscribe = (listener: (store: T) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const setState = (newState: T) => {
    store = newState;
    listeners.forEach((listener) => listener(newState));
  };

  return (): [T, (newState: T) => void] => {
    const [value, setValue] = useState<T>(getState() as T);

    useEffect(() => {
      const unsubscribe = subscribe(setValue);

      return () => {
        unsubscribe();
      };
    }, []);

    return [value, setState];
  };
};

export default createStore;
