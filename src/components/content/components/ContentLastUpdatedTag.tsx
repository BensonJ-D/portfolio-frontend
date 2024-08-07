import { summarisedTimeElapsed } from '../../../utils/DateTimeUtils';
import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { styled } from '@mui/material';

const Footer = styled('div')(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: '400',
  color: theme.palette.text.secondary
}));

const ContentLastUpdatedTag = ({ timestamp }: { timestamp?: DateTime }) => {
  const [lastUpdated, setLastUpdated] = useState<string>(
    'Less than a minute ago'
  );

  useEffect(() => {
    timestamp
      ? setLastUpdated(summarisedTimeElapsed(timestamp))
      : setLastUpdated('unknown.');
  }, [timestamp]);

  return <Footer>Last updated: {lastUpdated}</Footer>;
};

export default ContentLastUpdatedTag;
