import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { NEXT_PUBLIC_BACKEND_BASE_URL } from '@/constants/envVariables';

export const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_BACKEND_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

type BodyType = Record<string, any> | Array<any> | FormData | null;

export const apiManager = async (
  url: string,
  body: BodyType,
  method: AxiosRequestConfig['method'],
  header: AxiosRequestConfig['headers'] = {},
  baseURL = NEXT_PUBLIC_BACKEND_BASE_URL
): Promise<AxiosResponse> => {
  const defaultHeaders = {
    ...axiosInstance.defaults.headers.common,
    ...header,
  };

  try {
    return axiosInstance({
      method: method,
      url: url,
      data: body,
      baseURL: baseURL,
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error('API Error', e);
    throw e;
  }
};
