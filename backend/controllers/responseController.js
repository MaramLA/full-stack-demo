// successfull response handler
export const successResponse = (
  response,
  statusCode = 200,
  message = "done successfully",
  payload = {}
) => {
  response.status(statusCode).send({
    success: true,
    message: message,
    payload: payload,
  });
  return;
};

// ussuccessfull response handler
export const errorResponse = (
  response,
  statusCode = 500,
  message = "server error"
) => {
  response.status(statusCode).send({
    success: false,
    message: message,
  });
  return;
};
