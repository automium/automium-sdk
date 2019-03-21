import got from "got";
import { invokeOptions } from "../global";
import * as Sentry from "@sentry/node";

export const invokeSave = async (config, svc) => {
  try {
    const input = {
      name: svc.metadata.name,
      service: svc
    };
    const options = invokeOptions(input, config.token, config.timeout);
    const funcResponse = await got(
      `${config.gateway}/${config.infraID}/savespec`,
      options
    );
    return { status: true, result: funcResponse.body };
  } catch (err) {
    Sentry.captureException(err);
    console.error("an error occured while executing the request:", err.name);
    return { status: false };
  }
};
