import { DateTime } from 'luxon';

export type PageResponse = {
  pageTitle: string,
  content: string,
  timestamp: string
}

export type PageContent = {
  title: string,
  content: string,
  timestamp: DateTime
}

export const defaultPageDetails: PageContent = {
  title: '',
  content: '',
  timestamp: DateTime.now()
};
