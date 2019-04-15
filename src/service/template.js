// @flow
export const haproxy = {
  apiVersion: "core.automium.io/v1beta1",
  kind: "Service",
  metadata: {
    labels: { app: "haproxy" },
    name: "myloadbalancer"
  },
  spec: {
    replicas: 1,
    flavor: "e3standard.x2",
    version: "1.8",
    tags: [],
    env: [
      {
        name: "haproxy_user",
        value: ""
      },
      {
        name: "haproxy_pass",
        value: ""
      },
      {
        name: "haproxy_conf",
        value: `resolvers dns-consul
      nameserver w1 consul.service.automium.consul:53
      hold valid 1s
      
      listen web
        bind *:80
        option http-server-close
        option forwardfor
        server-template wp-docker 3 kubernetes-workers.service.automium.consul:30000 check port 80 init-addr last,libc,none resolvers dns-consul`
      }
    ],
    extra: []
  }
};

export const kubernetes_cluster = {
  apiVersion: "core.automium.io/v1beta1",
  kind: "Service",
  metadata: {
    labels: { app: "kubernetes-cluster" },
    name: "mykubernetescluster"
  },
  spec: {
    replicas: 3,
    flavor: "e3standard.x4",
    version: "1.13.5",
    tags: [],
    env: [],
    extra: []
  }
};

export const kubernetes_nodepool = {
  apiVersion: "core.automium.io/v1beta1",
  kind: "Service",
  metadata: {
    labels: { app: "kubernetes-nodepool" },
    name: "mykubernetesnodes"
  },
  spec: {
    replicas: 1,
    flavor: "e3standard.x3",
    version: "1.13.5",
    tags: [],
    env: [
      {
        name: "cluster_name",
        value: "mykubernetescluster"
      }
    ],
    extra: []
  }
};
