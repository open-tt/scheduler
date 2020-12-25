// tslint:disable-next-line:no-namespace
import {Player} from '../models/player';

// tslint:disable-next-line:no-namespace
export namespace UserApi {
  export class Paths {
    // private static BASE_URL = 'http://35.239.173.45:3001';
    private static BASE_URL = 'http://0.0.0.0:3001';
    private static AUTH = '/authenticate';
    private static USERS = '/users';
    private static CURRENT_USER = '/current_user';
    private static _ROLES = '/roles';

    static auth(): string { return Paths.BASE_URL + Paths.AUTH; }
    static createUser(): string { return Paths.BASE_URL + Paths.USERS; }
    static getCurrentUser(): string { return Paths.BASE_URL + Paths.CURRENT_USER; }
    static getUser(id: string): string { return Paths.BASE_URL + Paths.USERS + `/${id}`; }
    static updateUser(id: string): string { return Paths.BASE_URL + Paths.USERS + `/${id}`; }
    static addRoleToUser(id: string): string { return Paths.BASE_URL + Paths.USERS + `/${id}` + Paths._ROLES; }
    static deleteRoleFromUser(id: string): string { return Paths.BASE_URL + Paths.USERS + `/${id}` + Paths._ROLES; }
  }

  export class AuthResponse {
    // tslint:disable-next-line:variable-name
    auth_token: string;
  }

  export class CreateUserResponse {
    success: boolean;
    newUserID: number;
    enabled: boolean;
    token: string;
  }

  export class GetUserResponse {
    success: boolean;
    user: {
      name: string;
      email: string;
      profile_img: string;
      is_enabled: boolean;
    };
  }

  export class GetCurrentUserResponse {
    user: Player;
  }
}
