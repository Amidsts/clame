import { Response } from "express";

export type handleResponseArgType = {
  res: Response;
  data?: any;
  status?: number;
  message?: string;
};

export const handleResponse = ({
  res,
  data,
  status = 200,
  message,
}: handleResponseArgType): Response => {
  return res.status(status).json({
    message,
    data,
  });
};
