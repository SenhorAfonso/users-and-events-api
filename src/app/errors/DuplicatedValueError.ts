import StatusCodes from "http-status-codes";
import ApiErrors from "./ApiErrors";
import ErrorMessage from "./enum/ErrorMessageEnum";

class DuplicatedValueError extends ApiErrors {
  constructor(message: string = ErrorMessage.DuplicatedValueError) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
    this.name = 'Duplicated Value';
  }
}

export default DuplicatedValueError;