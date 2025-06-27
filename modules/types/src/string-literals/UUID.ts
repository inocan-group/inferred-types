/**
 * **UUID** - _**U**niversally **U**nique **ID**entifier_
 *
 * A unique identifer as defined by [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122#section-4.1)
 *
 * A UUID is 128 bits long, and can guarantee uniqueness across space and time.
 * UUIDs were originally used in the Apollo Network Computing System and later in
 * the Open Software Foundation's (OSF) Distributed Computing Environment (DCE), and
 * then in Microsoft Windows platforms.
 *
 * - each region is composed of Hexedecimal notation
 * - there are 5 regions of varying lengths
 * - in total a UUID is composed of 16 octets
 *
 * **Related:** `UUID_Urn`
 */
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

/**
 * A URN representation of a UUID string
 *
 * **Related:** `UUID`
 */
export type UUID_Urn = `urn:uuid:${UUID}`;
