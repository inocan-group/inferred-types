export const IPv6 = {
    "Loopback": "::1/128",
    "Multicast": "ff00::/8",
    "IPv4MappedAddresses": "::FFFF:0:0/96",
    "Unicast": "fe80::/10",
    "DocumentationAddresses": "2001:db8::/32"
} as const;

export const IPv4 = {
  "Loopback": "127.0.0.1"
} as const;


/**
 * Lookup of protocols which provides a tuple of: `[insecure,secure]`
 */
export const NETWORK_PROTOCOL_LOOKUP = {
  http: ["http", "https"],
  ftp: ["ftp", "sftp"],
  file: ["","file"],
  ws: ["ws","wss"],
  ssh: ["","ssh"],
  "scp": ["","scp"]
 } as const;

