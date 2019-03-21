import got from "got";
import { invokeOptions } from "../global";
import * as Sentry from "@sentry/node";

export const invokeDeploy = async (config, svc) => {
  try {
    //fix service name
    svc.metadata.name = svc.metadata.name.toLowerCase();

    const input = {
      service: svc
    };
    const options = invokeOptions(input, config.token, config.timeout);
    const funcResponse = await got(
      `${config.gateway}/${config.infraID}/applyservice`,
      options
    );
    return { status: true, result: funcResponse.body };
  } catch (err) {
    Sentry.captureException(err);
    console.error("an error occured while executing the request:", err);
    return { status: false };
  }
};
