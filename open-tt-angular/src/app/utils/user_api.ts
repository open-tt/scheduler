// tslint:disable-next-line:no-namespace
import { Player } from '../models/player';
import { environment } from '../../environments/environment';

// tslint:disable-next-line:no-namespace
export namespace UserApi {
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
