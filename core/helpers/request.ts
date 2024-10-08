import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

axios.defaults.timeout = Number(process.env.NEXT_PUBLIC_API_CONNECT_TIMEOUT) || 10000;

interface IRequest {
  method?: Method;
  url: string;
  data?: any;
  contentType?: string;
  baseURL?: string;
}

export const request = ({
  method = 'POST',
  url = '',
  data = null,
  contentType = 'application/json',
  baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
}: IRequest): Promise<any> => {
  const options: AxiosRequestConfig = {
    method,
    baseURL,
    url,
    headers: { 'content-type': contentType },
  };

  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      // @ts-ignore
      options.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (data && method === 'GET') {
    options.params = data;
  } else if (data) {
    options.data = data;
  }

  const errorHandler = (axiosError: AxiosError) => {
    const error = { status: 0, message: '', code: '' };
    if (axiosError.response) {
      error.status = axiosError.response.status;
      // @ts-ignore
      error.code = axiosError.response?.data?.code || '';
      // @ts-ignore
      error.message = axiosError.response?.data?.message || '';
    } else {
      error.status = 600;
      error.code = 'NETWORK_ERROR';
      error.message = 'Network error';
    }
    console.log(error);
    return error;
  };

  return new Promise((resolve, reject) => {
    axios(options)
      .then(response => resolve(response.data))
      .catch(error => reject(errorHandler(error)));
  });
};
