import {API_URL_ANDROID, API_URL_IOS, API_URL as PROD_URL, STAGE} from '@env';
import axios from 'axios';
import {Platform} from 'react-native';
import {StorageAdapter} from '../../adapters';

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

// todo: interceptor de respuesta 401 para renovar token

export {schoolpayApi};
