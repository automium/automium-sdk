jest.mock("got"); // got is now a mock function

import "@babel/polyfill";
import got from "got";
import { invokeSpecs } from "../../src/infra/specs";
import { specs } from "./data";

beforeEach(() => {
  // Cleaning up between tests
  got.mockClear();
});

it("should get valid specs", async () => {
  got.mockReturnValue(Promise.resolve({ body: specs }));

  const config = {
    gateway: "https://AUTOMIUM_ENDPOINT",
    infraID: "default",
    timeout: 200,
    token: "TOKEN"
  };
  const result = await invokeSpecs(config, "master");

  expect(got).toHaveBeenCalledTimes(1);
  expect(got).toHaveBeenCalledWith(
    "https://AUTOMIUM_ENDPOINT/default/infraspecs",
    {
      body: { branch: "master" },
      encoding: "utf8",
      json: true,
      method: "POST",
      timeout: 200,
      headers: {
        authorization: "Bearer TOKEN"
      }
    }
  );
  expect(result.status).toBe(true);
  expect(result.result).toBe(specs);
});
