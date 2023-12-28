import StatusCodes from "http-status-codes";

class AuthenticationError extends Error {
  private status: number;
  public name: string;

  constructor(message: string) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
    this.name = 'Unauthorized'
  }
}

export default AuthenticationError;