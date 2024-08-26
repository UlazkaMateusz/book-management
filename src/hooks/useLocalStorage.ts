import { useState, useSyncExternalStore } from "react";

export const useLocalStorage = <LocalStorageType>(
  localStorageKey: string,
  defaultValue: LocalStorageType,
) => {
  const [[cachedValue, cachedValueJson], setCachedValue] = useState([
    defaultValue,
    JSON.stringify(defaultValue),
  ]);

  const subscribe = (listener: (this: Window, ev: StorageEvent) => unknown) => {
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener("storage", listener);
    };
  };

  const getSnapshot = () => {
    const value = localStorage.getItem(localStorageKey);
    if (value == cachedValueJson) {
      return cachedValue;
    }

    const newValue = value ? JSON.parse(value) : defaultValue;
    setCachedValue([newValue, JSON.stringify(newValue)]);
  };

  const value = useSyncExternalStore(subscribe, getSnapshot) ?? defaultValue;

  const setValue = (value: LocalStorageType) => {
    console.log("setting value");
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  };

  return [value, setValue] as const;
};
