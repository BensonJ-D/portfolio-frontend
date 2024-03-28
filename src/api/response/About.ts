import { DateTime } from 'luxon';

export type AboutResponse = {
  content: string,
  timestamp: string
}

export type AboutContent = {
  content: string,
  timestamp: DateTime
}

export const defaultAboutDetails: AboutContent = {
  content: '',
  timestamp: DateTime.now()
};
