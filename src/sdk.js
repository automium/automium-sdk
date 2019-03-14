import { Infra } from "./infra/infra";
import { invokeLogin } from "./auth/login";

export class Client {
  constructor(url) {
    this.gatewayURL = url;
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
