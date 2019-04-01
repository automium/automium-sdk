// @flow
import got from "got";
import { invokeOptions } from "../global";
import * as Sentry from "@sentry/node";

export const invokeStatus = async (config: {
  gateway: string,
  infraID: string,
  token: string,
  timeout: number
}) => {
  try {
    const input = {};
    const options = invokeOptions(input, config.token, config.timeout);
    const funcResponse = await got(
      `${config.gateway}/${config.infraID}/infrastatus`,
      options
    );
    return { status: true, result: funcResponse.body };
  } catch (err) {
    Sentry.captureException(err);
    console.error("an error occured while executing the request:", err);
    let result: any = {};
    return { status: false, result: result };
  }
};
