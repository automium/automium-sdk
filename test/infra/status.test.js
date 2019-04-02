jest.mock("got"); // got is now a mock function

import "@babel/polyfill";
import got from "got";
import { Infra } from "../../src/infra/infra";
import { status } from "./data";

beforeEach(() => {
  // Cleaning up between tests
  got.mockClear();
});

it("should get infra status", async () => {
  got.mockReturnValue(Promise.resolve({ body: status }));

  const infra = new Infra("https://AUTOMIUM_ENDPOINT", "TOKEN", 200, "default");
  const result = await infra.status();

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
  expect(result).toBe(status);
});
