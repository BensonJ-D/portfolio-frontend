import { WebSocketEvent } from './WebSocketEvent';

export enum WebSocketMessageType {
  // AUTHENTICATE = 'Handshake',
  // READY = 'READY',
  // EVENT = 'EVENT'
}

export type WebSocketMessage = {
  messageType: WebSocketMessageType
  messagePayload: WebSocketEvent<any>
}
