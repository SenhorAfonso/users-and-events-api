import StatusCodes from "http-status-codes";

class AuthenticationError extends Error {
  private status: number;

  constructor(message: string) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

export default AuthenticationError;