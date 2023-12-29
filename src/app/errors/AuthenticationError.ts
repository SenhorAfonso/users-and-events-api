import StatusCodes from "http-status-codes";
import ErrorMessage from "./enum/ErrorMessageEnum";
import ApiErrors from "./ApiErrors";

class AuthenticationError extends ApiErrors {
  public status: number;

  constructor(message: string = ErrorMessage.AuthenticationError) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
    this.name = 'Unauthorized';
  }
}

export default AuthenticationError;