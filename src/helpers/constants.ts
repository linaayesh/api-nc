import config from '../config';

export const messages = {
  authResponse: {
    NO_CONTENT: 'NO SUCH A CONTENT',
    ALREADY_MATCHED: 'CONTENT IS ALREADY MATCHED',
    NOT_EXIST_USER: 'NOT EXIST USER',
    BAD_REQUEST: 'BAD REQUEST',
    ALREADY_EXIST: 'ALREADY EXIST USER',
    PASSWORD_CHANGED: 'PASSWORD CHANGED',
    INCORRECT_PASSWORD: 'INCORRECT PASSWORD',
    ALREADY_APPROVED: 'ALREADY APPROVED',
    ALREADY_REJECTED: 'ALREADY REJECTED',
    PENDING: 'PENDING ACCOUNT',
    BANNED: 'BANNED ACCOUNT',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND',
    SUCCESS_RESET_PASSWORD: 'RESET PASSWORD SUCCESSFULLY',
    APPROVED_USER: 'APPROVED ACCOUNT',
    SUCCESS: 'SUCCESS PROCESS',
    SUCCESS_ADD_USER: 'ADDED USER SUCCESSFULLY',
    NOT_EXIST: 'NOT EXIST USER',
    SUCCESS_EDIT: 'EDIT SUCCESSFULLY',
    WRONG_EMAIL_OR_PASSWORD: 'Incorrect email or password',
    SUCCESS_LOGIN: 'SUCCESS LOGIN',
    SUCCESS_SIGNUP: 'SUCCESS SIGNUP',
    LOGOUT: 'SUCCESS LOGOUT',
    USER_STATISTICS: 'USER STATISTICS',
    DASHBOARD_VARS_CHANGED: 'DASHBOARD VARS CHANGED SUCCESSFULLY',
    RECOVERED_GREATER_COST: 'RECOVERED COSTS CAN NOT BE GREATER THAN COSTS',
  },
  check: {
    RESET_EMAIL_CHECK: 'RESET EMAIL CHECK',
    REJECT_EMAIL_CHECK: 'REJECT EMAIL CHECK',
  },
  listOfUsers: {
    APPROVED: 'APPROVED USERS',
    PENDING: 'PENDING USERS',
    REJECTED: 'REJECTED USERS',
    BANNED: 'BANNED USERS',
  },
  token: {
    ACCESS_TOKEN: 'accessToken',
    RESET_TOKEN: 'resetPasswordToken',
    VERIFY_TOKEN: 'verifyEmailToken',
  },
};

export const httpStatus = {
  UNAUTHORIZED: 401,
  CREATED: 201,
  OK: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  REDIRECT: 302,
};

export const userStatus = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  BANNED: 4,
};

export const userRoles = {
  SYSTEM: 1,
  MASTER_ADMIN: 2,
  ADMIN: 3,
  COMEDIAN: 4,
};

export const errorResponse = {
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

export const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,10}$/;

export const REVENUE_DEFAULT_VALUE = 0;
export const LOGGER_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'cyan',
  debug: 'gray',
};

export const PASSWORD_LENGTH = 15;
export const SALT_ROUNDS = 10;

export const emailType = {
  CREATE: 'create',
  VERIFY: 'verify',
  RESET: 'reset',
  APPROVE: 'approve',
  REJECT: 'reject',
};

export const redirectURLs = {
  RESET: `${config.server.CLIENT_URL}/resetPassword`,
  LOGIN: `${config.server.CLIENT_URL}`,
  FAQ: `${config.server.CLIENT_URL}/faq`,
  CONTACT_US: `mailto:${config.email.NEXTUP_COMEDY_SUPPORT_EMAIL}`,
};

export const expire = {
  EXP_30d: '30d',
  EXP_24h: '24h',
};

export const validationRulesMessages = {
  VALID_EMAIL: 'You must enter a valid Email',
  NAME_EMPTY: 'Name cannot be empty',
  NAME_REQUIRED: 'Name is required',
  PASSWORD_LENGTH: 'Password length must be between 6 and 33 characters',
  PASSWORD_MATCH: 'New password should not be the same as the old one',
};

export const statisticsInitialValues = {
  counts: {
    allUsers: 0,
    pendingUsers: 0,
    approvedUsers: 0,
    rejectedUsers: 0,
    bannedUsers: 0,
    contents: 0,
    payouts: 0,
  },
  revenues: {
    paid: {
      allUsers: 0,
      pendingUsers: 0,
      approvedUsers: 0,
      rejectedUsers: 0,
      bannedUsers: 0,
    },
    total: {
      earnings: 0,
      allUsers: 0,
      pendingUsers: 0,
      approvedUsers: 0,
      rejectedUsers: 0,
      bannedUsers: 0,
    },
  },
};
