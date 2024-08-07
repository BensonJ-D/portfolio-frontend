import { WebSocketEvent } from './WebSocketEvent';

export enum WebSocketMessageType {
  // AUTHENTICATE = 'Handshake',
  // READY = 'READY',
  // eslint-disable-next-line no-unused-vars
  EVENT = 'EVENT'
}

export type WebSocketMessage = {
  messageType: WebSocketMessageType
  messagePayload: WebSocketEvent<any>
}
