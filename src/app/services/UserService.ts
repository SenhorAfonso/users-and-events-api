
export class UserService {

  constructor() {}

  async userSignUp(payload: any) {
    const result = 'Signing user up';
    return result;
  }

  async userSignIn(payload: any) {
    const result = 'Signing user in';
    return result;
  }

}

export default new UserService();
exports = { UserService }
