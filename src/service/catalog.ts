import { haproxy, kubernetes_cluster, kubernetes_nodepool } from "./template";

//TODO: get catalog from the API
export const invokeCatalog = () => {
  let catalog = [];
  catalog.push(haproxy);
  catalog.push(kubernetes_cluster);
  catalog.push(kubernetes_nodepool);
  return catalog;
};
