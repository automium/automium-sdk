// @flow
import { environments } from "../global";
import { invokeStatus } from "./status";
import { invokeSpecs } from "./specs";
import { Service } from "../service/service";
import { invokeServices } from "../service/services";
import { invokeCatalog } from "../service/catalog";

export class Infra {
  config: {
    gateway: string,
    infraID: string,
    token: string,
    timeout: number
  };
  catalog: any;
  constructor(gwURL: string, token: string, timeout: number, infraid: string) {
    this.config = {
      gateway: gwURL,
      infraID: infraid,
      token: token,
      timeout: timeout
    };
    this.catalog = invokeCatalog();
  }

  services = async () => {
    let services = [];
    const { status, result } = await invokeServices(this.config);
    if (status) {
      result.items.forEach(item => {
        let svc = new Service(this.config, item);
        if (item.spec.replicas > 0) {
          svc.status = "live";
          services.push(svc);
        }
      });
    }
    return services;
  };

  status = async () => {
    let { status, result } = await invokeStatus(this.config);
    if (status) {
      return result;
    } else {
      return [];
    }
  };

  specs = async (env: string) => {
    let branch: string = env || environments.DRAFT;
    let { status, result } = await invokeSpecs(this.config, branch);
    if (status) {
      return result;
    } else {
      return [];
    }
  };

  addService = (id: string) => {
    let service = this.catalog.filter(svc => svc.metadata.labels.app == id);
    if (service.length == 1) {
      return new Service(this.config, service[0]);
    } else {
      return null;
    }
  };

  getService = async (id: string, env: string) => {
    let specs = await this.specs(env);
    let service = specs.filter(svc => svc.metadata.name == id);
    if (service.length == 1) {
      let svc = new Service(this.config, service[0]);
      //check the real status of the service
      let services = await this.services();
      let liveService = services.filter(svc => svc.data.metadata.name == id);
      if (liveService.length == 1) {
        console.info("service already deployed");
        svc.status = liveService[0].status;
        //TODO: check if it's dirty
      }
      return svc;
    } else {
      return null;
    }
  };

  deploy = () => {
    throw Error("Not implemented");
  };
}
