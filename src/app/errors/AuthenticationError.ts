import StatusCodes from "http-status-codes";

class AuthenticationError extends Error {
  public name: string;
  private status: number;

  constructor(message: string) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
    this.name = 'Unauthorized';
  }
}

export default AuthenticationError;