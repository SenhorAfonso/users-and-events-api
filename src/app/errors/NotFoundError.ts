import StatusCodes from "http-status-codes";

class NotFoundError extends Error {
  private status: number;

  constructor(message: string) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
    this.name = 'Not found';
  }
}

export default NotFoundError;