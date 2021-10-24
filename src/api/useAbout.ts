import axios from 'axios';
import { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';

type AboutResponse = {
  content: string,
  timestamp: string
};

type AboutDetails = {
  content: string,
  timestamp: Moment
};

type AboutResult = {
  details: AboutDetails,
  loading: boolean,
  error: string | undefined
}

const defaultAboutDetails: AboutDetails = {
  content: '',
  timestamp: moment()
};

const useAbout = (): AboutResult => {
  const client = axios.create({ baseURL: 'http://localhost:4000/api/portfolio' });

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
          content: content,
          timestamp: moment(timestamp)
        });
      })
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return { details, loading, error };
};

export default useAbout;
