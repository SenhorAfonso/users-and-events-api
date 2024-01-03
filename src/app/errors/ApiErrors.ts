import StatusCodes from 'http-status-codes';

class ApiErrors extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export default ApiErrors;