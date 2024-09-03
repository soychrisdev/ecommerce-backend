import { Request, Response } from "express";
import { ventiService } from "services/ventipay.service";
import { asyncWrapper } from "utils/asynWrapper";
import { sendError, sendResponse } from "utils/response";

const checkOutsByIdController = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const checkouts = await ventiService.checkOutById(id);

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

export default checkOutsByIdController; 