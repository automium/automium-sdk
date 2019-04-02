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
