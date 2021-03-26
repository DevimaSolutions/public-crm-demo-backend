const getSuccessResponseWithData = (
  data: any,
  message = 'Success',
  status = 200,
  success = true,
) =>
  ({
    data,
    message,
    status,
    success,
  });

const getSuccessResponse = (
  message = 'Success',
  status = 200,
  success = true,
) =>
  ({
    message,
    status,
    success,
  });

export default {
  getSuccessResponseWithData,
  getSuccessResponse,
};
