jest.mock("got"); // got is now a mock function

import "@babel/polyfill";
import got from "got";
import { Infra } from "../../src/infra/infra";
import { Service } from "../../src/service/service";
import { rawServices } from "./data";

beforeEach(() => {
  // Cleaning up between tests
  got.mockClear();
});

it("should get services", async () => {
  got.mockReturnValue(Promise.resolve({ body: { items: rawServices } }));

  const infra = new Infra("https://AUTOMIUM_ENDPOINT", "TOKEN", 200, "default");
  const result = await infra.services();

  expect(got).toHaveBeenCalledTimes(1);
  expect(got).toHaveBeenCalledWith(
    "https://AUTOMIUM_ENDPOINT/default/infraservices",
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

  let services = [];
  rawServices.forEach(data => {
    let svc = new Service(infra.config, data);
    //TODO: move this logic in the Service constructor
    if (data.spec.replicas > 0) {
      svc.status = "live";
      services.push(svc);
    }
  });
  expect(result.data).toEqual(services.data);
});
