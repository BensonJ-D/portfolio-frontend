import axios from 'axios';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

type AboutResponse = {
  content: string,
  timestamp: string
};

type AboutDetails = {
  content: string,
  timestamp: DateTime
};

type AboutResult = {
  details: AboutDetails,
  loading: boolean,
  error: string | undefined
}

const defaultAboutDetails: AboutDetails = {
  content: '',
  timestamp: DateTime.now()
};

const usePortfolioApi = (): AboutResult => {
  const client = axios.create({ baseURL: 'http://backend.local' });

  const [details, setDetails] = useState<AboutDetails>(defaultAboutDetails);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    client.get('/about')
      .then(result => {
        const { data } = result;
        const { content, timestamp } = data as AboutResponse;

        setDetails({
          content,
          timestamp: DateTime.fromISO(timestamp)
        });
      })
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return { details, loading, error };
};

export default usePortfolioApi;
