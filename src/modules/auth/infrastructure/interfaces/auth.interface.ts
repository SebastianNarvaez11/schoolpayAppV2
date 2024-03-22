export type IAuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface IAuthResponse {
  user: IUserAuthResponse;
  accessToken: string;
  refreshToken: string;
}

export interface IUserAuthResponse {
  id: string;
  name: string;
  email: string;
  image: null;
  role: string;
  school: ISchoolAuthResponse;
}

export interface ISchoolAuthResponse {
  id: string;
  name: string;
  logo: string;
}

export interface IAuthCheckStatusResponse {
  user: IUserAuthResponse;
}

export interface IRefreshTokenResponse {
  newAccessToken: string;
}
