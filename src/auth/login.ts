import got, { GotJSONOptions } from "got";
import * as Sentry from "@sentry/node";

export const invokeLogin = async (
  gateway: string,
  username: string,
  password: string
) => {
  try {
    const input = {
      username: username,
      password: password
    };
    const options: GotJSONOptions = {
      method: "POST",
      json: true,
      encoding: "utf8",
      body: input,
      timeout: 200
    };
    const funcResponse = await got(`${gateway}/login`, options);
    return { status: true, result: funcResponse.body };
  } catch (err) {
    Sentry.captureException(err);
    console.error("an error occured while executing the request:", err.name);
    let result: any = {};
    return { status: false, result: result };
  }
};
