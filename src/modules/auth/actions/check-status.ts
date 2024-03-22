import {isAxiosError} from 'axios';
import {schoolpayApi} from '../../../config';
import {AuthMapper, IAuthCheckStatusResponse} from '../infrastructure';

export const checkAuthStatus = async () => {
  try {
    const {data} = await schoolpayApi.get<IAuthCheckStatusResponse>(
      '/auth/check-status',
    );

    return {
      user: AuthMapper.fromUserAuthResponseToModel(data.user),
      school: AuthMapper.fromSchoolAuthResponseToModel(data.user.school),
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      return null;
    }
    console.log(error);
    return null;
  }
};
