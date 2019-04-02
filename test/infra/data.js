export const specs = [
  {
    apiVersion: "core.automium.io/v1beta1",
    kind: "Service",
    metadata: { labels: [{ app: "kubernetes" }], name: "mycluster" },
    spec: {
      env: [],
      extra: [],
      flavor: "e3standard.x4",
      replicas: 3,
      tags: [],
      version: "1.0.2"
    }
  },
  {
    apiVersion: "core.automium.io/v1beta1",
    kind: "Service",
    metadata: { labels: [{ app: "etcd" }], name: "myetcddatabase" },
    spec: {
      env: [],
      extra: [],
      flavor: "e3standard.x3",
      replicas: 1,
      tags: [],
      version: "1.0.2"
    }
  }
];

export const status = [
  {
    kind: "Node",
    apiVersion: "core.automium.io/v1beta1",
    metadata: { name: "mycluster-node-0" },
    spec: { hostname: "kubernetes-workers-0" },
    status: {
      nodeProperties: {
        id: "b856cb7e-4c2c-818c-6135-a2fa8da202f7",
        node: "kubernetes-workers-0",
        address: "10.2.0.8",
        publicAddress: "178.239.184.237"
      },
      nodeHealthChecks: [
        {
          checkID: "serfHealth",
          name: "Serf Health Status",
          status: "passing",
          output: "Agent alive and reachable",
          serviceID: "",
          serviceName: ""
        }
      ]
    }
  }
];

export const rawServices = [
  {
    kind: "Service",
    apiVersion: "core.automium.io/v1beta1",
    metadata: {
      name: "mycluster",
      labels: { app: "kubernetes" },
      creationTimestamp: "2019-03-19T12:12:35Z"
    },
    spec: { replicas: 3, flavor: "e3standard.x4", version: "1.0.2", env: [] },
    status: {}
  },
  {
    kind: "Service",
    apiVersion: "core.automium.io/v1beta1",
    metadata: {
      name: "myetcddatabase",
      labels: { app: "etcd" },
      creationTimestamp: "2019-03-18T19:19:20Z"
    },
    spec: { replicas: 1, flavor: "e3standard.x3", version: "1.0.2", env: [] },
    status: {}
  }
];
