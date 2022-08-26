export const messages = {
  authResponse: {
    PASSWORD_CHANGED: 'PASSWORD_CHANGED',
    INCORRECT_PASSWORD: 'INCORRECT_PASSWORD',
    ALREADY_APPROVED: 'ALREADY APPROVED',
    ALREADY_REJECTED: 'ALREADY REJECTED',
    PENDING: 'PENDING ACCOUNT',
    BANNED: 'BANNED ACCOUNT',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND',
    approvedUser: 'APPROVED ACCOUNT',
    rejectedUser: 'REJECTED ACCOUNT',
    UNVERIFIED: 'NOT VERIFIED ACCOUNT',
    notExist: 'NOT EXIST USER',
    waitApprove: 'WAITING APPROVAL',
    wrongEmailOrPassword: 'Incorrect email or password',
    logIn: 'SUCCESS LOGIN',
    SUCCESS: 'SUCCESS PROCESS',
    LOGOUT: 'SUCCESS LOGOUT',
    reset: 'SUCCESS RESET',
    edit: 'SUCCESS EDIT',
    success: 'SUCCESS',
    unAuthUser: 'UNAUTHORIZED',
    resetPassword: 'RESET PASSWORD',
    conflict: 'CONFLICT',
    userStatistics: 'USER STATISTICS',
  },
  check: {
    emailCheck: 'CHECK EMAIL',
  },
  listOfUsers: {
    approved: 'APPROVED USERS',
    notApproved: 'PENDING USERS',
    rejected: 'REJECTED USERS',
  },
  token: {
    accessToken: 'accessToken',
    resetToken: 'resetPasswordToken',
    verifyToken: 'verifyEmailToken',
  },
};

export const HttpStatus = {
  UNAUTHORIZED: 401,
  CREATED: 201,
  OK: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  REDIRECT: 302,
};

export const USER_STATUS = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  BANNED: 4,
};

export const USER_ROLES = {
  SYSTEM: 1,
  MASTER_ADMIN: 2,
  ADMIN: 3,
  COMEDIAN: 4,
};

export const ERROR_RESPONSE = {
  CLIENT: 'PAGE NOT FOUND',
  SERVER: 'INTERNAL SERVER ERROR',
};

export const LOGGER_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export const REVENUE_DEFAULT_VALUE = 0;
export const LOGGER_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'cyan',
  debug: 'gray',
};
