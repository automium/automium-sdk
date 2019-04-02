jest.mock("got"); // got is now a mock function

import "@babel/polyfill";
import got from "got";
import { invokeStatus } from "../../src/infra/status";
import { status } from "./data";

beforeEach(() => {
  // Cleaning up between tests
  got.mockClear();
});

it("should get infra status", async () => {
  got.mockReturnValue(Promise.resolve({ body: status }));

  const config = {
    gateway: "https://AUTOMIUM_ENDPOINT",
    infraID: "default",
    timeout: 200,
    token: "TOKEN"
  };
  const result = await invokeStatus(config);

  expect(got).toHaveBeenCalledTimes(1);
  expect(got).toHaveBeenCalledWith(
    "https://AUTOMIUM_ENDPOINT/default/infrastatus",
    {
      body: {},
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
  expect(result.result).toBe(status);
});
