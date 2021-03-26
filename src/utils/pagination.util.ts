const getPaginationValue = (page: number, limit: number) => {
  const result = {
    page,
    limit,
  };

  if (!result.page) {
    result.page = 1;
  }

  if (!result.limit || result.limit > 20) {
    result.limit = 20;
  }

  return result;
};

export default getPaginationValue;
