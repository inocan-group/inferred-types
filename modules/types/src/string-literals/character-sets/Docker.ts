export interface DockerCompose {
  /** The version of the Docker Compose file format. */
  version?: string;

  /** The services defined in the Docker Compose file. */
  services?: Record<string, DockerService>;

  /** Configuration for named volumes. */
  volumes?: Record<string, VolumeDefinition | null>;

  /** Configuration for named networks. */
  networks?: Record<string, NetworkDefinition | null>;

  /** Configuration for named secrets. */
  secrets?: Record<string, SecretDefinition | null>;

  /** Configuration for named configs. */
  configs?: Record<string, ConfigDefinition | null>;

  [key: string]: unknown;
}

export interface DockerService {
  /** The name of the Docker image to use. */
  image?: string;

  /** A custom container name for the service. */
  container_name?: string;

  /** Command to override the default image command. */
  command?: string | string[];

  /** Arguments to pass to the command. */
  entrypoint?: string | string[];

  /** Environment variables for the container. */
  environment?: Record<string, string | null>;

  /** Ports to map from the container to the host. */
  ports?: string[] | PortMapping[];

  /** Volumes to mount in the container. */
  volumes?: string[] | VolumeMapping[];

  /** Dependencies for this service. */
  depends_on?: string[] | Record<string, DockerDependsOn>;

  /** Configuration for networks the service connects to. */
  networks?: string[] | Record<string, NetworkConfig>;

  /** Restart policy for the container. */
  restart?: string;

  /** Build configuration for the service. */
  build?: string | BuildDefinition;

  /** Logging options for the container. */
  logging?: LoggingOptions;

  /** The healthcheck configuration for the container. */
  healthcheck?: Healthcheck;

  /** Labels for the container. */
  labels?: Record<string, string>;

  /** DNS servers for the container. */
  dns?: string[];

  /** Extra hosts to add to the container's /etc/hosts file. */
  extra_hosts?: string[];

  /** User to run the container as. */
  user?: string;

  /** Whether the service should be started in privileged mode. */
  privileged?: boolean;

  /** CPU and memory resource constraints. */
  deploy?: DeployConfig;

  /** Additional arbitrary options. */
  [key: string]: any;
}

export interface VolumeDefinition {
  /** The driver to use for the volume. */
  driver?: string;

  /** Options for the volume driver. */
  driver_opts?: Record<string, string>;

  /** Labels for the volume. */
  labels?: Record<string, string>;

  /** External configuration for the volume. */
  external?: boolean | { name: string };
}

export interface NetworkDefinition {
  /** The driver to use for the network. */
  driver?: string;

  /** Options for the network driver. */
  driver_opts?: Record<string, string>;

  /** Labels for the network. */
  labels?: Record<string, string>;

  /** External configuration for the network. */
  external?: boolean | { name: string };

  /** Additional configuration for attachable networks. */
  attachable?: boolean;

  /** Whether the network is internal only. */
  internal?: boolean;
}

export interface SecretDefinition {
  /** The source of the secret. */
  file?: string;

  /** External configuration for the secret. */
  external?: boolean | { name: string };
}

export interface ConfigDefinition {
  /** The source of the config. */
  file?: string;

  /** External configuration for the config. */
  external?: boolean | { name: string };
}

export interface PortMapping {
  /** The host port to bind to. */
  published: number;

  /** The container port to expose. */
  target: number;

  /** The protocol to use (e.g., "tcp", "udp"). */
  protocol?: string;

  /** The host IP to bind to. */
  host_ip?: string;
}

export interface VolumeMapping {
  /** The host path or named volume. */
  source: string;

  /** The container path. */
  target: string;

  /** The access mode for the volume (e.g., "ro", "rw"). */
  mode?: string;
}

export interface DockerDependsOn {
  /** The condition for the dependency (e.g., "service_healthy"). */
  condition: "service_started" | "service_healthy" | "service_completed_successfully";
}

export interface NetworkConfig {
  /** Aliases for the service on the network. */
  aliases?: string[];

  /** Priority for network connection. */
  priority?: number;

  /** IPv4 or IPv6 address to assign to the container. */
  ipv4_address?: string;
  ipv6_address?: string;
}

export interface BuildDefinition {
  /** The context for the build (e.g., a directory path). */
  context: string;

  /** The Dockerfile to use for the build. */
  dockerfile?: string;

  /** Arguments to pass to the build process. */
  args?: Record<string, string | null>;

  /** Cache options for the build. */
  cache_from?: string[];

  /** Target stage in a multi-stage build. */
  target?: string;
}

export interface LoggingOptions {
  /** The logging driver to use. */
  driver: string;

  /** Options for the logging driver. */
  options?: Record<string, string>;
}

export interface Healthcheck {
  /** The command to run for the healthcheck. */
  test: string | string[];

  /** The interval between healthchecks. */
  interval?: string;

  /** The timeout for each healthcheck. */
  timeout?: string;

  /** The number of retries before considering the container unhealthy. */
  retries?: number;

  /** The start period before starting healthchecks. */
  start_period?: string;
}

export interface DeployConfig {
  /** The number of replicas for the service. */
  replicas?: number;

  /** CPU and memory resource limits and reservations. */
  resources?: {
    limits?: {
      cpus?: string;
      memory?: string;
    };
    reservations?: {
      cpus?: string;
      memory?: string;
    };
  };

  /** Configuration for placement constraints. */
  placement?: {
    constraints?: string[];
  };

  /** Configuration for update strategies. */
  update_config?: {
    parallelism?: number;
    delay?: string;
    failure_action?: string;
  };
}
