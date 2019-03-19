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

export const kubernetes = {
  apiVersion: "core.automium.io/v1beta1",
  kind: "Service",
  metadata: {
    labels: { app: "kubernetes" },
    name: "mycluster"
  },
  spec: {
    replicas: 1,
    flavor: "e3standard.x3",
    version: "1.13",
    tags: [],
    env: [
      {
        name: "master_flavor",
        value: "e3standard.x4"
      },
      {
        name: "master_count",
        value: "1"
      }
    ],
    extra: []
  }
};

export const etcd = {
  apiVersion: "core.automium.io/v1beta1",
  kind: "Service",
  metadata: {
    labels: { app: "etcd" },
    name: "myetcddatabase"
  },
  spec: {
    replicas: 1,
    flavor: "e3standard.x3",
    version: "3.23",
    tags: [],
    env: [],
    extra: []
  }
};

export const heketi = {
  apiVersion: "core.automium.io/v1beta1",
  kind: "Service",
  metadata: {
    labels: { app: "kubernetes-heketi" },
    name: "myheketicluster"
  },
  spec: {
    replicas: 3,
    flavor: "e3standard.x3",
    version: "8.0",
    tags: [],
    env: [
      {
        name: "kubernetes_master_name",
        value: "kubernetes-master"
      },
      {
        name: "master-ip",
        value: "kubernetes-master.service.automium.consul"
      },
      {
        name: "heketi_admin_password",
        value: "password"
      },
      {
        name: "heketi_volume_size",
        value: "10"
      },
      {
        name: "heketi_volume_type",
        value: "Top"
      }
    ],
    extra: []
  }
};
