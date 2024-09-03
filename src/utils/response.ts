import { Response } from "express";

interface Error {
  statusCode?: number;
  message?: string;
  errors?: Array<Error>;
}

export const sendResponse = (res: Response, data: unknown, code = 200) =>
  res.status(code).json({
    success: true,
    data,
  });


export const sendError = (res: Response, error: Error, customMessage?: string) => {
  const { statusCode = 500, message, errors } = error;

  const errorMessage = customMessage || message;

  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    errors,
  });
};
