import {API_URL_ANDROID, API_URL_IOS, API_URL as PROD_URL, STAGE} from '@env';
import axios from 'axios';
import {Platform} from 'react-native';
import {StorageAdapter} from '../../adapters';
import {IRefreshTokenResponse} from '../../modules/auth/infrastructure';

export const BASE_URL =
  STAGE === 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;

const schoolpayApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR DE SOLICITUDES
schoolpayApi.interceptors.request.use(async config => {
  const accessToken = await StorageAdapter.getItem('access-token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// INTERCEPTOR DE RESPUESTAS
schoolpayApi.interceptors.response.use(
  reponse => {
    // respuesta exitosa
    return reponse;
  },
  async error => {
    // respuesta fallida
    if (error.response.status === 401) {
      if (error.response.data.error.name === 'TokenExpiredError') {
        console.log('401:TokenExpiredError');
        try {
          const refreshToken = await StorageAdapter.getItem('refresh-token');

          const {data} = await axios.get<IRefreshTokenResponse>(
            `${BASE_URL}/auth/refresh-token`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );

          console.log({data});

          await StorageAdapter.setItem('access-token', data.newAccessToken);

          const originalRequest = error.config;
          return schoolpayApi.request(originalRequest);
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }
    return Promise.reject(error);
  },
);

export {schoolpayApi};
