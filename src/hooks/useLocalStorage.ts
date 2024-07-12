import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
  const savedQuery = localStorage.getItem(key);

  const [query, setQuery] = useState(savedQuery || initialValue);

  useEffect(() => {
    localStorage.setItem(key, query);
  }, [key, query]);

  return [query, setQuery] as const;
};

export default useLocalStorage;
