// @flow
import { haproxy, etcd, kubernetes, heketi } from "./template";

//TODO: get catalog from the API
export const invokeCatalog = () => {
  let catalog = [];
  catalog.push(haproxy);
  catalog.push(etcd);
  catalog.push(kubernetes);
  catalog.push(heketi);
  return catalog;
};
