import { useSyncExternalStore } from "react";

const createStore = <T>(initialState: T) => {
  let store = initialState ?? ({} as T);
  const listeners = new Set<(store: T) => void>();

  const getState = () => store;

  const subscribe = (listener: (store: T) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const setState = (cb: (prevState: T) => T) => {
    store = cb(store);
    listeners.forEach((listener) => listener(store));
  };

  return {
    setState,
    useStore: <X>(selector: (state: T) => X) =>
      useSyncExternalStore(subscribe, () => selector(getState())),
  };
};

export default createStore;
