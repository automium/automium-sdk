// @flow
import "@babel/polyfill";
import * as Sentry from "@sentry/node";
import { version } from "../package.json";
import { environments } from "./global";

export const Environment = environments;

export { Client } from "./sdk";

// Configure the error reporting system
Sentry.init({
  dsn: "https://dbeb5c17210d49d9a4bb0bfb11fd338e@stacktracer.enter.it/2",
  release: `automium-sdk@${version}`
});
