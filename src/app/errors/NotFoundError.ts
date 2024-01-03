import StatusCodes from 'http-status-codes';
import ErrorMessage from './enum/ErrorMessageEnum';
import ApiErrors from './ApiErrors';

class NotFoundError extends ApiErrors {
  public status: number;

  constructor(message: string = ErrorMessage.NotFoundError) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
    this.name = 'Not Found';
  }
}

export default NotFoundError;