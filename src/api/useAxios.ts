import axios from 'axios';

const useAxios = () => {
  const axiosClient = axios.create({ baseURL: 'https://backend.local' });

  return {
    axiosClient
  };
};

export default useAxios;
