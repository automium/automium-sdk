import got from "got";
import { invokeOptions } from "../global";
import * as Sentry from "@sentry/node";

export const invokeSpecs = async (config, branch) => {
  try {
    const input = {
      branch: branch
    };
    const options = invokeOptions(input, config.token);
    const funcResponse = await got(
      `${config.gateway}/${config.infraID}/infraspecs`,
      options
    );
    return { status: true, result: funcResponse.body };
  } catch (err) {
    Sentry.captureException(err);
    console.error("an error occured while executing the request:", err);
    return { status: false };
  }
};
