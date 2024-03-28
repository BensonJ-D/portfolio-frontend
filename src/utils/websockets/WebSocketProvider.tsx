import { WebSocketListener } from './types/WebSocketListener';
import React, { createContext, PropsWithChildren } from 'react';
import { WebSocketManager } from './WebSocketManager';

const webSocketManager = new WebSocketManager('wss://websocket.local/chat');

export type WebSocketContextType = {
  addListener: (listener: WebSocketListener<any, any>) => void,
  removeListener: (listener: WebSocketListener<any, any>) => void
};

export const WebSocketContext = createContext<WebSocketContextType>({
  addListener: (_) => {},
  removeListener: (_) => {}
});

export const WebSocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  console.log('Provider');
  return (
    <WebSocketContext.Provider value={{
      addListener: webSocketManager.addListener,
      removeListener: webSocketManager.removeListener
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};
