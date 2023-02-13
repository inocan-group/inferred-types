import { Suggest } from "../Suggest";

/**
 * **Ipv4**
 * 
 * A simple representation of an IPv4 address
 */
export type Ipv4 = `${number}.${number}.${number}.${number}`;

/**
 * **Ipv6**
 * 
 * A simple representation of an IPv6 address
 */
export type Ipv6 = `${number}:${number}:${number}:${number}:${number}:${number}:${number}:${number}`;

/**
 * **SuggestIpAddress**
 * 
 * Some simple examples of IP addresses which can be given as a
 * suggested set of string where people need to enter an **IPv4**
 * address.
 */
export type SuggestIpAddress = Suggest<"192.168.0.1" | "10.10.0.1" | "172.168.0.1">;
