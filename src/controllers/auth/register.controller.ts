import { Request, Response } from "express";
import createHttpError from "http-errors";
import { userService } from "services/user.service";
import { ventiService } from "services/ventipay.service";
import { asyncWrapper } from "utils/asynWrapper";
import { hashPassword } from "utils/hashPassword";
import { messages } from "utils/messages";
import { sendError, sendResponse } from "utils/response";

const registerController = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { name, email, password, ventiPayId } = req.body;

    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      console.error(messages.EXISTING_EMAIL);
      return sendError(res, createHttpError(409, messages.EXISTING_EMAIL));
    }

    const hash = await hashPassword(password);
    const ventiUserCreation = await ventiService.createClient({ name: name, email: email, country: 'chile' });

    await userService.create(name, email, ventiUserCreation.id, hash, "user");



    return sendResponse(res, messages.ACCOUNT_CREATED, 201);
  } catch (err) {
    const error = err as Error;

    console.error(error.message);
    return sendError(res, error);
  }
});

export default registerController;
