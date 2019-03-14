export const environments = {
  DRAFT: "master",
  LIVE: "prod"
};

export const invokeOptions = (input, token) => {
  return {
    method: "POST",
    json: true,
    encoding: "utf8",
    timeout: 10000,
    body: input,
    headers: {
      authorization: `Bearer ${token}`
    }
  };
};
