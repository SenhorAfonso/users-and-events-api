import StatusCodes from "http-status-codes";
import ApiErrors from "./ApiErrors";
import ErrorMessage from "./enum/ErrorMessageEnum";

class BadRequestError extends ApiErrors {
  constructor(message: string = ErrorMessage.BadRequestError) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
    this.name = 'Bad Request';
  }
}

export default BadRequestError;