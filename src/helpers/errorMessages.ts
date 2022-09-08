import CustomError from './CustomError';
import { messages, httpStatus } from './constants';

export const NOT_EXIST_ERROR = new CustomError(
  messages.authResponse.NOT_EXIST,
  httpStatus.NOT_FOUND,
);

export const WRONG_EMAIL_OR_PASSWORD_ERROR = new CustomError(
  messages.authResponse.WRONG_EMAIL_OR_PASSWORD,
  httpStatus.UNAUTHORIZED,
);

export const UNAUTHORIZED_ERROR = new CustomError(
  messages.authResponse.UNAUTHORIZED,
  httpStatus.UNAUTHORIZED,
);

export const INCORRECT_PASSWORD_ERROR = new CustomError(
  messages.authResponse.INCORRECT_PASSWORD,
  httpStatus.BAD_REQUEST,
);

export const ALREADY_REJECTED_ERROR = new CustomError(
  messages.authResponse.ALREADY_REJECTED,
  httpStatus.UNAUTHORIZED,
);

export const PENDING_ERROR = new CustomError(
  messages.authResponse.PENDING,
  httpStatus.UNAUTHORIZED,
);

export const BANNED_ERROR = new CustomError(
  messages.authResponse.BANNED,
  httpStatus.UNAUTHORIZED,
);

export const ALREADY_EXIST_ERROR = new CustomError(
  messages.authResponse.ALREADY_EXIST,
  httpStatus.UNAUTHORIZED,
);

export const NO_CONTENT_ERROR = new CustomError(
  messages.authResponse.NO_CONTENT,
  httpStatus.NOT_FOUND,
);

export const RECOVERED_GREATER_COST_ERROR = new CustomError(
  messages.authResponse.RECOVERED_GREATER_COST,
  httpStatus.BAD_REQUEST,
);

export const CONTENT_MATCH_ERROR = new CustomError(
  messages.authResponse.ALREADY_MATCHED,
  httpStatus.BAD_REQUEST,
);

export const NOT_EXIST_USER_ERROR = new CustomError(
  messages.authResponse.NOT_EXIST_USER,
  httpStatus.BAD_REQUEST,
);

export const BAD_REQUEST_ERROR = new CustomError(
  messages.authResponse.BAD_REQUEST,
  httpStatus.BAD_REQUEST,
);
