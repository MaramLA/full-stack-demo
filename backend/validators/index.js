import { validationResult } from "express-validator";

export const runValidation = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    let errorsList = errors.array().map((error) => error.msg);
    return response.status(422).send({
      message: errorsList[0],
    });
  }
  next();
};
