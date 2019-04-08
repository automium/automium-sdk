// @flow
import got from "got";
import { invokeOptions } from "../global";
import * as Sentry from "@sentry/node";

export const invokeLogs = async (
  config: {
    gateway: string,
    infraID: string,
    token: string,
    timeout: number
  },
  name: string
) => {
  try {
    const input = {
      name: name
    };
    const options = invokeOptions(input, config.token, config.timeout);
    const funcResponse = await got(
      `${config.gateway}/${config.infraID}/servicelogs`,
      options
    );
    return { status: true, result: funcResponse.body.logs };
  } catch (err) {
    Sentry.captureException(err);
    console.error("an error occured while executing the request:", err.name);
    return { status: false, result: "" };
  }
};
