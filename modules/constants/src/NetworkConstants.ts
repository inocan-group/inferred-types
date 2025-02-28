export const IPv6 = {
    Loopback: "::1/128",
    Multicast: "ff00::/8",
    IPv4MappedAddresses: "::FFFF:0:0/96",
    Unicast: "fe80::/10",
    DocumentationAddresses: "2001:db8::/32",
} as const;

export const IPv4 = {
    Loopback: "127.0.0.1",
} as const;

export const NETWORK_PROTOCOL_INSECURE = [
    "http",
    "ftp",
    "ws",
    "dns",
    "telnet",
    "imap",
    "pop3",
    "smtp",
] as const;

export const NETWORK_PROTOCOL_SECURE = [
    "https",
    "sftp",
    "wss",
    "sdns",
    "ssh",

] as const;

export const NETWORK_PROTOCOL = [
    ...NETWORK_PROTOCOL_INSECURE,
    ...NETWORK_PROTOCOL_SECURE,
] as const;

/**
 * Lookup of protocols which provides a tuple of: `[insecure,secure]`
 */
export const NETWORK_PROTOCOL_LOOKUP = {
    http: ["http", "https"],
    ftp: ["ftp", "sftp"],
    file: ["", "file"],
    ws: ["ws", "wss"],
    ssh: ["", "ssh"],
    scp: ["", "scp"],
    telnet: ["telnet", ""],
    dns: ["dns", "sdns"],
} as const;

export const PROTOCOL_DEFAULT_PORTS = {
    http: 80,
    https: 443,
    ws: 80,
    wss: 443,
    ssh: 22,
    telnet: 23,
    dns: 53,
    sdns: 853,
    smtp: 25,
    imap: 142,
    pop3: 110,
    ftp: 21,
    sftp: 22,
} as const satisfies Record<typeof NETWORK_PROTOCOL[number], number>;

/**
 * **TLD**
 *
 * Top level domains in DNS. This is not a comprehensive list but
 * takes the core ones and adds in some popular choices.
 */
export const TOP_LEVEL_DOMAINS = [
    "com",
    "org",
    "net",
    "int",
    "edu",
    "gov",
    "io",
    "mil",
    "arpa",
    "academy",
    "agency",
    "analytics",
    "app",
    "art",
    "bet",
    "beer",
    "book",
    "coffee",
    "dot",
    "doctor",
    "dog",
    "family",
    "game",
    "guide",
    "guru",
    "info",
    "inc",
    "news",
    "new",
    "ninja",
    "now",
    "online",
    "page",
    "photos",
    "place",
    "pub",
    "room",
    "show",
    "technology",
    "tel",
    "tech",
    "team",
    "talk",
    "travel",
    "website",
    "work",
    "works",
    "wow",
    "uk",
    "us",
    "fr",
    "de",
    "eu",
    "london",
] as const;
