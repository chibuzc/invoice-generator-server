import { errorType } from './errorConstants';

export const getErrorCode = (errorName) => {
  return errorType[errorName];
};
