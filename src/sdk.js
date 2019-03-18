import { Infra } from "./infra/infra";
import { invokeLogin } from "./auth/login";

export class Client {
  constructor(options) {
    this.gatewayURL = options.baseUrl;
    this.token = options.auth;
  }

  login = async (username, password) => {
    const { status, result } = await invokeLogin(
      this.gatewayURL,
      username,
      password
    );

    if (status) {
      this.token = result;
    }
    return status;
  };

  infra(infraid) {
    //TODO: add more validations
    if (infraid == undefined) {
      throw Error("invalid infraID");
    }
    return new Infra(this.gatewayURL, this.token, infraid);
  }
}
