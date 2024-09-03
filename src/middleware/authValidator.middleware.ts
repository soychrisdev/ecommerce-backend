import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import passport from "passport";

import { messages } from "../constants";
import { sendError } from "utils/response";
import { UserRoles } from "types/types";
export interface JwtPayload {
  id: string;
  role: UserRoles;
  iat: number;
  exp: number;
}
export const authValidator = {
  verifyAccessToken: (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      "jwt",
      { session: false },
      (err: Error, jwtPayload: JwtPayload, info: { message: string }) => {
        if (err) {
          return next(createError(500, err));
        }

        if (!jwtPayload) {
          const { message } = info || {};
          return next(createError(401, message ?? messages.INVALID_TOKEN));
        }

        // @ts-ignore
        req.userId = jwtPayload.id;
        // @ts-ignore
        req.userRole = jwtPayload.role;
        // @ts-ignore
        req.tokenExp = jwtPayload.exp;

        return next();
      },
    )(req, res, next),

  adminOnly: (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { userId, userRole } = req;

    if (userRole !== "admin") {
      console.error(`user ${userId} attempted to access admin only route`);
      return sendError(res, createError(403, messages.ACCESS_DENIED));
    }

    return next();
  },
};
