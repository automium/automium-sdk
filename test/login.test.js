import "@babel/polyfill";
import { invokeLogin } from "../src/auth/login";

it("login fails with the wrong credential", async () => {
  expect.assertions(1);
  const result = await invokeLogin("TEST_ENDPOINT", "username", "password");
  expect(result.status).toEqual(false);
});
