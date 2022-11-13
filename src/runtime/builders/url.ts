import { DomainName, FullyQualifiedUrl, Ipv4, NetworkProtocol, RelativeUrl } from "src/types";

export const url = <
  Proto extends NetworkProtocol,
  Site extends DomainName | Ipv4,
  Path extends RelativeUrl
>(
  ...args: [Proto, Site, Path]
) => {
  if (args.length === 3) {
    return `${args[0]}://${args[1]}/${args[2]}`;
  } else {
    return args[0];
  }
};

const _c = url("http", "www.foo.com", "foo/");

const _b: FullyQualifiedUrl = "https://192.168.142.1/";
