import { DependencyList, useEffect } from 'react';

const useWebSocketListener = <E, P>(
  eventType: E,
  onMessage: (payload: P) => unknown,
  deps?: DependencyList
) => {
  useEffect(() => {
    // const listener;
  });
};

export default useWebSocketListener;
