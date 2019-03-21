export const environments = {
  DRAFT: "master",
  LIVE: "prod"
};

export const invokeOptions = (input, token, timeout) => {
  return {
    method: "POST",
    json: true,
    encoding: "utf8",
    timeout: timeout,
    body: input,
    headers: {
      authorization: `Bearer ${token}`
    }
  };
};
