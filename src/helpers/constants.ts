export const messages = {
  authResponse: {
    ALREADY_APPROVED: 'ALREADY APPROVED',
    ALREADY_REJECTED: 'ALREADY REJECTED',
    PENDING: 'PENDING ACCOUNT',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND',
    approvedUser: 'APPROVED ACCOUNT',
    rejectedUser: 'REJECTED ACCOUNT',
    // UNVERIFIED
    UNVERIFIED: 'NOT VERIFIED ACCOUNT',
    notExist: 'NOT EXIST USER',
    waitApprove: 'WAITING APPROVAL',
    adminApproval: 'SUCCESSFULLY APPROVED',
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
  SYSTEM_ADMIN: 1,
  COMEDIAN: 2,
};

export const ERROR_RESPONSE = {
  CLIENT: 'PAGE NOT FOUND',
  SERVER: 'INTERNAL SERVER ERROR',
};

export const emailTemplates = {
  test: 'testMail',
};

export const LOGGER_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export const LOGGER_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'cyan',
  debug: 'gray',
};
