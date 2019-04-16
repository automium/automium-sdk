export const environments = {
  DRAFT: "master",
  LIVE: "prod"
};

export const invokeOptions = (input: any, token: string, timeout: number) => {
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
