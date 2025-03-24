export type JsonRxProtocol = `rx` | `json2`;
export type JsonRxMessageEncoding = `compact` | `binary` | `verbose`;
export type JsonRxPayloadEncoding = `json` | `cbor` | `msgpack` | `ubjson`;

/**
 * JSON-Rx Encoding Specifier
 *
 * [Docs](https://jsonjoy.com/specs/json-rx/encoding-specifier)
 */
export type JsonRxEncodingSpecifier = `rpc.${JsonRxProtocol}.${JsonRxMessageEncoding}.${JsonRxPayloadEncoding}`;
