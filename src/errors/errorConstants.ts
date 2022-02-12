export const errorName = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
};

export const errorType = {
  UNAUTHORIZED: {
    message: 'Unauthorized',
    statusCode: 401,
  },
  NOT_FOUND: {
    message: 'Requested record not found',
    statusCode: 404,
  },
  SERVER_ERROR: {
    message: 'Server error',
    statusCode: 404,
  },
};
