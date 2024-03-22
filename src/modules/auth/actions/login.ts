import {schoolpayApi} from '../../../config';
import {AuthMapper, IAuthResponse} from '../infrastructure';

export const authLogin = async (email: string, password: string) => {
  email = email.toLocaleLowerCase();

  try {
    const {data} = await schoolpayApi.post<IAuthResponse>('/auth/login', {
      email,
      password,
    });

    return {
      user: AuthMapper.fromUserAuthResponseToModel(data.user),
      school: AuthMapper.fromSchoolAuthResponseToModel(data.user.school),
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
