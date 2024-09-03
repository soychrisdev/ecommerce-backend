import { Request, Response } from "express";
import { ventiService } from "services/ventipay.service";
import { CheckoutData } from "types/types";
import { asyncWrapper } from "utils/asynWrapper";
import { sendError, sendResponse } from "utils/response";

const createCheckOutController = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { currency, authorize, cancel_url_method, success_url_method, items }: CheckoutData = req.body as unknown as CheckoutData;
    console.log(req.body);
    const createCheckoutResponse = await ventiService.createCheckout({ authorize: authorize, cancel_url_method: cancel_url_method, currency: currency, success_url_method: success_url_method, items: items });

    if (!createCheckoutResponse) {
      return sendResponse(res, "Problemas al crear nuevos checkouts", 400);
    }

    return sendResponse(res, createCheckoutResponse, 201);
  } catch (err) {
    const error = err as Error;

    console.error(error.message);
    return sendError(res, error);
  }
});

export default createCheckOutController; 