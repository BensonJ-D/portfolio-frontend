import { DateTime } from 'luxon';

export const summarisedTimeElapsed = (then: DateTime): string => {
  const now = DateTime.now();
  const diff = now.diff(then, ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'], { conversionAccuracy: 'longterm' });
  console.log('Then', then);
  console.log('Now', now);
  console.log('Diff', diff);
  const years = Math.abs(diff.years);
  const months = Math.abs(diff.months);
  const weeks = Math.abs(diff.weeks);
  const days = Math.abs(diff.days);
  const hours = Math.abs(diff.hours);
  const minutes = Math.abs(diff.minutes);
  if (years > 0) {
    return years > 1 ? `${years} years ago` : `${years} year ago`;
  }
  if (months > 0) {
    return months > 1 ? `${months} months ago` : `${months} month ago`;
  }
  if (weeks > 0) {
    return weeks > 1 ? `${weeks} weeks ago` : `${weeks} week ago`;
  }
  if (days > 0) {
    return days > 1 ? `${days} days ago` : `${days} day ago`;
  }
  if (hours > 0) {
    return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
  }
  if (minutes >= 1) {
    return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;
  }
  return 'Less than a minute ago';
};
