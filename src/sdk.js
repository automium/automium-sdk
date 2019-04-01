// @flow
import { Infra } from "./infra/infra";
import { invokeLogin } from "./auth/login";

export class Client {
  gatewayURL: string;
  token: string;
  timeout: number;
  constructor(options: any) {
    this.gatewayURL = options.baseUrl;
    this.token = options.auth;
    this.timeout = options.timeout || 10000;
  }

  login = async (username: string, password: string) => {
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

  infra(infraid: string) {
    //TODO: add more validations
    if (infraid == undefined) {
      throw Error("invalid infraID");
    }
    return new Infra(this.gatewayURL, this.token, this.timeout, infraid);
  }
}
