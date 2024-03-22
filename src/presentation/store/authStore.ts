import {create} from 'zustand';
import {IAuthStatus} from '../../modules/auth/infrastructure';
import {authLogin, checkAuthStatus} from '../../modules/auth/actions';
import {ISchoolModel, IUserModel} from '../../modules/auth/domain';
import {StorageAdapter} from '../../adapters';

interface IAuthStore {
  status: IAuthStatus;
  user?: IUserModel;
  school?: ISchoolModel;
  accessToken?: string;
  refreshToken?: string;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>()((set, get) => ({
  status: 'checking',
  user: undefined,
  school: undefined,
  accessToken: undefined,
  refreshToken: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    if (!resp) {
      get().logout();
      return false;
    }

    await StorageAdapter.setItem('access-token', resp.accessToken);
    await StorageAdapter.setItem('refresh-token', resp.refreshToken);

    set({
      status: 'authenticated',
      user: resp.user,
      school: resp.school,
      accessToken: resp.accessToken,
      refreshToken: resp.refreshToken,
    });

    return true;
  },

  checkStatus: async () => {
    const resp = await checkAuthStatus();

    if (!resp) return get().logout();

    set({
      status: 'authenticated',
      user: resp.user,
      school: resp.school,
    });
  },

  logout: async () => {
    await StorageAdapter.removeItem('access-token');
    await StorageAdapter.removeItem('refresh-token');

    set({
      status: 'unauthenticated',
      accessToken: undefined,
      refreshToken: undefined,
      user: undefined,
      school: undefined,
    });
  },
}));
