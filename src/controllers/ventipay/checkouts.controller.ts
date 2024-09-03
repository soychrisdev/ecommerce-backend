import { Request, Response } from "express";
import { ventiService } from "services/ventipay.service";
import { asyncWrapper } from "utils/asynWrapper";
import { sendError, sendResponse } from "utils/response";

const checkOutsController = asyncWrapper(async (req: Request, res: Response) => {
  try {

    const checkouts = await ventiService.checkOut();

    if (!checkouts) {
      return sendResponse(res, "No hay checkouts", 404);
    }

    return sendResponse(res, checkouts, 200);
  } catch (err) {
    const error = err as Error;

    console.error(error.message);
    return sendError(res, error);
  }
});

export default checkOutsController; 