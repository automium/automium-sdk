import { invokeSave } from "./save";
import { invokeDelete } from "./delete";
import { invokeDeploy } from "./deploy";

export class Service {
  constructor(config, data) {
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

  setEnv = (name, value) => {
    this.data.spec.env.forEach(env => {
      if (env.name == name) {
        env.value = value;
      }
    });
    this.dirty = true;
  };

  setFlavor = name => {
    this.data.spec.flavor = name;
    this.dirty = true;
  };

  setVersion = version => {
    this.data.spec.version = version;
    this.dirty = true;
  };

  setReplicas = num => {
    this.data.spec.replicas = num;
    this.dirty = true;
  };

  save = async () => {
    //TODO: add token
    const { status, result } = await invokeSave(this.config, this.data);
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
    //TODO: add token
    let { status, result } = await invokeDeploy(this.config, this.data);
    if (status) {
      if (this.status == "deleted") {
        //TODO: add token
        let { status } = await invokeDelete(
          this.gatewayURL,
          this.infraID,
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
    //force replicas to 0
    this.data.spec.replicas = 0;
    //TODO: add token
    const { status, result } = await invokeSave(this.config, this.data);
    if (status) {
      this.status = "deleted";
    }
    return status; //what to return?
  };
}
