import { useEffect, useState } from 'react';

export const useVisited = () => {
  const [hasVisited] = useState(localStorage.getItem("hasVisited") || false);
  useEffect(() => {
    if (hasVisited) return;

    localStorage.setItem("hasVisited", true);
  }, [hasVisited]);
  return hasVisited;
};
