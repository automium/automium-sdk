// @flow
import got from "got";
import { invokeOptions } from "../global";
import * as Sentry from "@sentry/node";

export const invokeSpecs = async (
  config: {
    gateway: string,
    infraID: string,
    token: string,
    timeout: number
  },
  branch: string
) => {
  try {
    const input = {
      branch: branch
    };
    const options = invokeOptions(input, config.token, config.timeout);
    const funcResponse = await got(
      `${config.gateway}/${config.infraID}/infraspecs`,
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
