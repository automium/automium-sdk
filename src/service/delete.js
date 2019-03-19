import got from "got";
import { invokeOptions } from "../global";
import * as Sentry from "@sentry/node";

export const invokeDelete = async (config, name) => {
  try {
    const input = {
      name: name
    };
    const options = invokeOptions(input, config.token);
    const funcResponse = await got(
      `${config.gateway}/${config.infraID}/deletespec`,
      options
    );
    return { status: true, result: funcResponse.body };
  } catch (err) {
    Sentry.captureException(err);
    console.error("an error occured while executing the request:", err.name);
    return { status: false };
  }
};
