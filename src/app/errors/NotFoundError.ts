import StatusCodes from "http-status-codes";
import ErrorMessage from "./enum/ErrorMessageEnum";

class NotFoundError extends Error {
  public status: number;

  constructor(message: string = ErrorMessage.NotFoundError) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
    this.name = 'Not Found';
  }
}

export default NotFoundError;