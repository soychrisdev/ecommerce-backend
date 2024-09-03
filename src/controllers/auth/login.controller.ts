import { NextFunction, Request, Response } from "express";
import passport from "passport";
import createHttpError from "http-errors";


import { config } from "../../config";
import { messages } from "../../constants";
import { User } from "types/types";
import { generateTokens } from "utils/token";
import { asyncWrapper } from "utils/asynWrapper";
import { userTokenService } from "services/userToken.service";
import { convertTimeStrToMillisec } from "utils/convertTimeStrToMillisec";
import { sendError, sendResponse } from "utils/response";

function authenticateUserWithLocalStrategy(req: Request, res: Response, next: NextFunction) {
  return new Promise<{ user: User; accessToken: string; refreshToken: string }>(
    (resolve, reject) => {
      passport.authenticate(
        "local",
        { session: false },
        (err: Error, user: User, info: { message: string }) => {
          if (err) {
            return reject(createHttpError(500, err));
          }

          if (!user) {
            const { message } = info;
            return reject(createHttpError(401, message));
          }

          const { accessToken, refreshToken } = generateTokens(user.id, user.role);

          return resolve({ user, accessToken, refreshToken });
        },
      )(req, res, next);
    },
  );
}

const loginController = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      user,
      accessToken,
      refreshToken: newRefreshToken,
    } = await authenticateUserWithLocalStrategy(req, res, next);

    const { refreshToken: existingRefreshToken } = req.cookies;

    if (existingRefreshToken) {
      const userToken = await userTokenService.findUserTokenByToken(existingRefreshToken);

      if (!userToken) {
        console.warn(
          `The refresh token sent from ${user.id} could be used in another device. All devices were signed out`,
        );

        await userTokenService.removeAllUserTokensById(user.id);
      } else {

        await userTokenService.removeUserTokenById(user.id);
      }

      res.clearCookie(config.refreshTokenName);
    }

    await userTokenService.create(user.id, newRefreshToken);

    res.cookie(config.refreshTokenName, newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: config.cookieDomain,
      maxAge: convertTimeStrToMillisec(config.refreshTokenExpiration),
    });

    return sendResponse(res, { token: accessToken }, 201);
  } catch (err) {
    const error = err as Error;

    console.error(error.message);

    if (error.message === messages.INVALID_TOKEN || error.message === messages.NO_AUTH_TOKEN) {
      return sendError(res, createHttpError(401, error));
    }

    return sendError(res, error);
  }
});

export default loginController;
