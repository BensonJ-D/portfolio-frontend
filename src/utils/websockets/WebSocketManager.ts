import { WebSocketListener } from './types/WebSocketListener';
import { WebSocketEvent } from './types/WebSocketEvent';
import { WebSocketMessage, WebSocketMessageType } from './types/WebSocketMessage';

export class WebSocketManager {
  private readonly address;

  constructor(address: string) {
    this.address = address;
    this.connect();
  }

  private readonly MINIMUM_REFRESH = 5000;
  private readonly MAXIMUM_REFRESH = 600000;

  private webSocketListeners: WebSocketListener<any, any>[] = [];
  private webSocket?: WebSocket;
  private socketClosed: boolean = true;
  private connectionLooper: any;
  private refreshTimer = this.MINIMUM_REFRESH;

  private initialise = async <PayloadType, EventType>(listener: WebSocketListener<PayloadType, EventType>) => {
    await listener.initialise();
  };

  private resetRefreshTimer = () => {
    this.refreshTimer = this.MINIMUM_REFRESH;
  };

  addListener = <PayloadType, EventType>(listener: WebSocketListener<PayloadType, EventType>) => {
    console.log('Add listener');
    this.webSocketListeners.push(listener);
    this.initialise(listener);
  };

  removeListener = <PayloadType, EventType>(listener: WebSocketListener<PayloadType, EventType>) => {
    console.log('Remove listener');
    const index = this.webSocketListeners.indexOf(listener);
    if (index > -1) this.webSocketListeners.splice(index, 1);
  };

  private send = (event: WebSocketEvent<any>) => {
    this.webSocketListeners.forEach((listener) => {
      if (event.eventType === listener.eventType) {
        listener.onChange(event.eventPayload);
      }
    });
  };

  private onOpen = () => {
    clearTimeout(this.connectionLooper);
    this.socketClosed = false;
  };

  private onMessage = (message: MessageEvent) => {
    const jsonMessage: WebSocketMessage = JSON.parse(message.data);

    switch (jsonMessage.messageType) {
      // case WebSocketMessageType.AUTHENTICATE: {
      //   const authenticateMessage =
      //   this.webSocket?.send();
      // }

      case WebSocketMessageType.EVENT: {
        this.send(jsonMessage.messagePayload);
        break;
      }
    }
  };

  private onError = () => {};

  private onClose = () => {
    console.log('Websocket closed');
    clearTimeout(this.connectionLooper);
    this.connectionLooper = setTimeout(async() => {
      await this.reconnect();
    }, this.refreshTimer);

    this.socketClosed = true;
  };

  private connect = () => {
    const connect = (address: string) => {
      // this.webSocket = new WebSocket(address);

      if (this.webSocket) {
        this.webSocket.onopen = this.onOpen;
        this.webSocket.onmessage = this.onMessage;
        this.webSocket.onerror = this.onError;
        this.webSocket.onclose = this.onClose;
      }
    };

    try {
      connect(this.address);
    } catch (e) {
      this.connectionLooper = setTimeout(() => this.reconnect(), this.refreshTimer);
    }
  };

  private reconnect = () => {
    this.webSocketListeners.forEach((listener) => { listener.reset(); });
    this.refreshTimer = Math.min(this.refreshTimer * 2, this.MAXIMUM_REFRESH);
    this.connect();
  };
}
