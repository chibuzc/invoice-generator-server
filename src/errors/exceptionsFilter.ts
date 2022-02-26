import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { CustomHttpExceptionResponse, HttpExceptionResponse } from './types';

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    let status: HttpStatus;
    let errorMessage: string;
    let isHttpError = false;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      isHttpError = true;

      errorMessage =
        (errorResponse as HttpExceptionResponse).error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Unexpected Internal Error';
    }

    const path = gqlHost.getInfo().path;

    const errorResponse = this.getErrorResponse(
      status,
      errorMessage,
      path,
      isHttpError,
    );
    this.logError(errorResponse, exception);

    return exception;
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    path: any,
    isHttpError: boolean,
  ): CustomHttpExceptionResponse => {
    return {
      statusCode: status,
      error: errorMessage,
      path: path?.key,
      method: path?.typename,
      timestamp: new Date(),
      isHttpError,
    };
  };

  logError = (
    errorResponse: CustomHttpExceptionResponse,
    exception: Error,
  ): void => {
    const { statusCode, error, method, path, isHttpError } = errorResponse;

    const errorLog = `Response Code: ${statusCode} - Method: ${method}_${path}
    \n
    ${isHttpError ? exception.stack : error}\n\n
    `;

    console.log(errorLog);
  };
}
