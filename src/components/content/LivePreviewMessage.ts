export type LivePreviewMessage = {
  type: 'content' | 'ready'
}

export type LivePreviewReadyMessage = LivePreviewMessage & {
  type: 'ready'
}

export type LivePreviewContentMessage = LivePreviewMessage & {
  type: 'content',
  title: string,
  content: string
}
