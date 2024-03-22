import {ISchoolAuthResponse, IUserAuthResponse} from '..';
import {ISchoolModel, IUserModel} from '../../domain';

export class AuthMapper {
  static fromUserAuthResponseToModel(result: IUserAuthResponse): IUserModel {
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      image: result.image,
      role: result.role,
    };
  }

  static fromSchoolAuthResponseToModel(
    result: ISchoolAuthResponse,
  ): ISchoolModel {
    return {
      id: result.id,
      name: result.name,
      logo: result.logo,
    };
  }
}
