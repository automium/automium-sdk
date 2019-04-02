jest.mock("got"); // got is now a mock function

import "@babel/polyfill";
import got from "got";
import { invokeLogin } from "../src/auth/login";

beforeEach(() => {
  // Cleaning up between tests
  got.mockClear();
});

it("login succeded with the valid input", async () => {
  got.mockReturnValue(Promise.resolve({ body: "TOKEN" }));

  const result = await invokeLogin(
    "http://AUTOMIUM_URL",
    "username",
    "password"
  );

  expect(got).toHaveBeenCalledTimes(1);
  expect(got).toHaveBeenCalledWith("http://AUTOMIUM_URL/login", {
    body: { password: "password", username: "username" },
    encoding: "utf8",
    json: true,
    method: "POST",
    timeout: 200
  });
  expect(result.status).toBe(true);
  expect(result.result).toBe("TOKEN");
});

it("login fails with the wrong credential", async () => {
  got.mockReturnValue(Promise.reject("Invalid credentials"));

  const result = await invokeLogin(
    "http://AUTOMIUM_URL",
    "username",
    "password"
  );

  expect(got).toHaveBeenCalledTimes(1);
  expect(got).toHaveBeenCalledWith("http://AUTOMIUM_URL/login", {
    body: { password: "password", username: "username" },
    encoding: "utf8",
    json: true,
    method: "POST",
    timeout: 200
  });
  expect(result.status).toBe(false);
});
