// @flow
import { invokeSave } from "./save";
import { invokeDelete } from "./delete";
import { invokeDeploy } from "./deploy";

export class Service {
  config: {
    gateway: string,
    infraID: string,
    token: string,
    timeout: number
  };
  data: any;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  dirty: boolean;
  constructor(
    config: {
      gateway: string,
      infraID: string,
      token: string,
      timeout: number
    },
    data: any
  ) {
    this.config = config;
    this.data = data;
    this.status = "new"; //or draft??
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.dirty = false; //draft is a status??
  }

  specs = () => {
    return this.data.spec;
  };

  setEnv = (name: string, value: string) => {
    this.data.spec.env.forEach(env => {
      if (env.name == name) {
        env.value = value;
      }
    });
    this.dirty = true;
  };

  setFlavor = (name: string) => {
    this.data.spec.flavor = name;
    this.dirty = true;
  };

  setVersion = (version: string) => {
    this.data.spec.version = version;
    this.dirty = true;
  };

  setReplicas = (num: number) => {
    this.data.spec.replicas = num;
    this.dirty = true;
  };

  save = async () => {
    const { status } = await invokeSave(this.config, this.data);
    if (status) {
      this.status = "draft"; //newdraft??
      this.dirty = false;
      this.updatedAt = new Date().toISOString();
    }
    return status; //what to return?
  };

  deploy = async () => {
    if (this.dirty) {
      console.warn("The service is not saved");
      return false;
    }
    let { status } = await invokeDeploy(this.config, this.data);
    if (status) {
      if (this.status == "deleted") {
        let { status } = await invokeDelete(
          this.config,
          this.data.metadata.name
        );
        if (status) {
          //TODO: change the status?
          this.deletedAt = new Date().toISOString();
        }
      } else {
        this.status = "live";
      }
    }
    return status; //what to return?
  };

  delete = async () => {
    //direct deletion of the spec if the service has not been deployed
    if (this.status === "new") {
      let { status } = await invokeDelete(this.config, this.data.metadata.name);
      if (status) {
        this.status = "deleted";
        this.deletedAt = new Date().toISOString();
      }
      return status; //what to return?
    }
    //start the deletion workflow: force replicas to 0
    this.data.spec.replicas = 0;
    const { status } = await invokeSave(this.config, this.data);
    if (status) {
      this.status = "deleted";
    }
    return status; //what to return?
  };
}
