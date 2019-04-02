jest.mock("got"); // got is now a mock function

import "@babel/polyfill";
import got from "got";
import { Infra } from "../../src/infra/infra";
import { specs } from "./data";

beforeEach(() => {
  // Cleaning up between tests
  got.mockClear();
});

it("should get infra specs", async () => {
  got.mockReturnValue(Promise.resolve({ body: specs }));

  const infra = new Infra("https://AUTOMIUM_ENDPOINT", "TOKEN", 200, "default");
  const result = await infra.specs();

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
  expect(result).toBe(specs);
});
