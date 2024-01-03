import StatusCodes from 'http-status-codes';
import ErrorMessage from './enum/ErrorMessageEnum';
import ApiErrors from './ApiErrors';

class InternalServerError extends ApiErrors {
  public status: number;

  constructor(message: string = ErrorMessage.InternalServerError) {
    super(message);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = 'Internal Server Error';
  }
}

export default InternalServerError;