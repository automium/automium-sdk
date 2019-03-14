import got from "got";
import * as Sentry from "@sentry/node";

export const invokeLogin = async (gateway, username, password) => {
  try {
    const input = {
      username: username,
      password: password
    };
    const options = {
      method: "POST",
      json: true,
      encoding: "utf8",
      body: input,
      timeout: 10000
    };
    const funcResponse = await got(`${gateway}/login`, options);
    return { status: true, result: funcResponse.body };
  } catch (err) {
    Sentry.captureException(err);
    console.error("an error occured while executing the request:", err.name);
    return { status: false };
  }
};
