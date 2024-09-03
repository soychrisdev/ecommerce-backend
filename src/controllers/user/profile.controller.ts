import { Request, Response } from "express";
import createHttpError from "http-errors";
import { userService } from "services/user.service";
import { asyncWrapper } from "utils/asynWrapper";
import { messages } from "utils/messages";
import { sendError, sendResponse } from "utils/response";

const profileController = {
  getProfile: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      console.log(id);
      if (!id) {
        console.error(messages.CANNOT_RETRIEVE_USER_DATA);
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      const user = await userService.findUserById(id);

      if (!user) {
        console.error(messages.CANNOT_RETRIEVE_USER_DATA);
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      // return user data
      return sendResponse(
        res,
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          photo: user.photo,
          ventiPay: user.ventiPay,
          aboutMe: user.aboutMe,
        },
        200,
      );
    } catch (err) {
      const error = err as Error;

      console.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  })
}

export default profileController;