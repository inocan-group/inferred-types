import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { urlMeta } from "inferred-types";
import {
  AddUrlPathSegment,
  Extends,
  GetUrlSource,
  GetUrlPath,
  UrlPort,
  UrlPath,
  UrlsFrom,
  GetUrlQueryParams,
  IsUrl,
  GetUrlProtocol,
  RemoveUrlPort
} from "inferred-types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Url testing", () => {


  it("UrlPath<T> happy path", () => {
    type Base = UrlPath;
    type FooBar = UrlPath<"/foo/bar">;
    type FooBar2 = UrlPath<"/foo/bar/">;

    type LeadingBadGuy = UrlPath<"/&foo/bar">;
    type TrailingBadGuy = UrlPath<"/foo/bar/*">;

    type cases = [
      Expect<Extends<"", Base>>,
      Expect<Extends<"/foo", Base>>,
      ExpectFalse<Extends<"/", Base>>,

      Expect<Equal<FooBar, `/foo/bar`>>,
      Expect<Equal<FooBar2, never>>,

      Expect<Equal<LeadingBadGuy, never>>,
      Expect<Equal<TrailingBadGuy, never>>,
    ];
    const cases: cases = [
      true, true, false,
      true, true,
      true, true,
    ];

  });


  it("PortSpecifier", () => {
    type None = UrlPort<{portRequirement: "not-allowed"}>;
    type Optional = UrlPort<{portRequirement: "optional"}>;
    type Required = UrlPort<{portRequirement: "required"}>;

    type Specific = UrlPort<{portRequirement: "required", ports: 80}>;
    type Multiple = UrlPort<{portRequirement: "required", ports: 80 | 443}>;

    type cases = [
      Expect<Equal<None, "">>,
      Expect<Equal<Optional, "" | `:${number}`>>,
      Expect<Equal<Required, `:${number}`>>,

      Expect<Equal<Specific, `:80`>>,
      Expect<Equal<Multiple, `:80` | `:443`>>,
    ];
    const cases: cases = [
      true, true, true,
      true, true
    ];

  });


  it("GetDomainName<T> happy path", () => {
    type None = GetUrlSource<"there I was">;
    type FooBar = GetUrlSource<"https://foo.bar">;
    type FooBarTerminated = GetUrlSource<"https://foo.bar/">;
    type Ip = GetUrlSource<"http://192.168.1.1">;

    type JustPath = GetUrlSource<"/baz">;
    type FooBarBaz = GetUrlSource<"https://foo.bar/baz">;
    type IpBaz = GetUrlSource<"http://192.168.1.1/baz">;

    type BareFooBar = GetUrlSource<"foo.bar">;
    type BareFooBarTerminated = GetUrlSource<"foo.bar/">;
    type BareIp = GetUrlSource<"192.168.1.1">;

    type MissingMiddle = GetUrlSource<"https://baz">;
    type MissingMiddle2 = GetUrlSource<"https:///baz">;


    type cases = [
      Expect<Equal<None, never>>,
      Expect<Equal<FooBar, "foo.bar">>,
      Expect<Equal<FooBarTerminated, "foo.bar">>,
      Expect<Equal<Ip, "192.168.1.1">>,

      Expect<Equal<JustPath, never>>,
      Expect<Equal<FooBarBaz, "foo.bar">>,
      Expect<Equal<IpBaz, "192.168.1.1">>,

      Expect<Equal<BareFooBar, "foo.bar">>,
      Expect<Equal<BareFooBarTerminated, "foo.bar">>,
      Expect<Equal<BareIp, "192.168.1.1">>,

      Expect<Equal<MissingMiddle, never>>,
      Expect<Equal<MissingMiddle2, never>>,
    ];
    const cases: cases = [
      true, true, true, true,
      true, true, true,
      true, true, true,
      true, true,
    ];

  });


  it("GetUrlProtocol<T>", () => {
    type Https = GetUrlProtocol<"https://foo.bar/baz">;
    type Ftp = GetUrlProtocol<"ftp://foo.bar">;
    type Union = GetUrlProtocol<"http://foo.bar/baz" | "https://foo.bar/baz">;

    type cases = [
      Expect<Equal<Https, "https">>,
      Expect<Equal<Ftp, "ftp">>,
      Expect<Equal<Union, "http" | "https">>,
    ];
    const cases: cases = [
      true, true, true
    ];

  });



  it("GetUrlQueryParams<T>", () => {
    type None = GetUrlQueryParams<"https://github.com/foo/bar">;
    type One = GetUrlQueryParams<"https://github.com/foo/bar?name=Bob">;
    type Two = GetUrlQueryParams<"https://github.com/foo/bar?name=Bob&age=36">;

    type cases = [
      Expect<Equal<None, "">>,
      Expect<Equal<One, "?name=Bob">>,
      Expect<Equal<Two, "?name=Bob&age=36">>,
    ];
    const cases: cases = [
      true,true,true
    ];

  });

  it("RemoveUrlPPort", () => {
    type Homelab = RemoveUrlPort<"https://192.168.1.1:443/admin/console">;
    type Union = RemoveUrlPort<`https://192.168.1.1:${"443" | "80"}/admin/console`>;
    type AtEnd = RemoveUrlPort<"https://192.168.1.1:443">;
    type WideNum = RemoveUrlPort<`https://192.168.1.1:${number}`>;

    type cases = [
      Expect<Equal<Homelab, "https://192.168.1.1/admin/console">>,
      Expect<Equal<Union, "https://192.168.1.1/admin/console">>,
      Expect<Equal<AtEnd, "https://192.168.1.1">>,
      Expect<Equal<WideNum, "https://192.168.1.1">>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

  it("GetUrlPath<T>", () => {
    type FooBarBaz = GetUrlPath<"https://foo.bar/baz">;
    type FooBarTerminated = GetUrlPath<"https://foo.bar/">;
    type FooBarBazQuery = GetUrlPath<"https://foo.bar/baz?name=Bob">;
    type BareBaz = GetUrlPath<"/baz">;
    type BareQuery = GetUrlPath<"https://foo.bar/?name=Bob">;
    type InvalidPath = GetUrlPath<"baz">;

    type NoPath = GetUrlPath<"https://foo.bar/">;
    type NoPath2 = GetUrlPath<"https://foo.bar">;

    type Port = GetUrlPath<"https://foo.bar:443">;
    type PortAndPath = GetUrlPath<"https://foo.bar:443/baz">;
    type Homelab = GetUrlPath<"https://192.168.1.1:443/admin/console">;

    type SimpleFooBar = GetUrlPath<"foo.bar">;
    type SimpleFooBarBaz = GetUrlPath<"foo.bar/baz">;

    type WithStrGeneric = GetUrlPath<`www.youtube.com/@${string}`>;
    type DoubleSlash = GetUrlPath<`foo.bar//`>;
    type DoubleSlashLater = GetUrlPath<`foo.bar/yes/no//oops`>;

    type cases = [
      Expect<Equal<FooBarBaz, "/baz">>,
      Expect<Equal<FooBarTerminated, "">>,
      Expect<Equal<FooBarBazQuery, "/baz">>,
      Expect<Equal<BareBaz, "/baz">>,
      Expect<Equal<BareQuery, "">>,
      Expect<Equal<InvalidPath, never>>,

      Expect<Equal<NoPath, "">>,
      Expect<Equal<NoPath2, "">>,

      Expect<Equal<Port, "">>,
      Expect<Equal<PortAndPath, "/baz">>,
      Expect<Equal<Homelab, "/admin/console">>,

      Expect<Equal<SimpleFooBar, "">>,
      Expect<Equal<SimpleFooBarBaz, "/baz">>,

      Expect<Equal<WithStrGeneric, `/@${string}`>>,
      Expect<Equal<DoubleSlash, never>>,
      Expect<Equal<DoubleSlashLater, never>>,
    ];
    const cases: cases = [
      true, true, true, true, true,true,
      true, true,
      true, true,true,
      true, true,
      true, true, true
    ];
  });


  it("AddUrlPathSegment<TExisting,TAdd>", () => {
    type FooBar = AddUrlPathSegment<"/foo", "bar">;
    type FooBarTerminated = AddUrlPathSegment<"/foo", "/bar/">;
    type FooBarForever = AddUrlPathSegment<"/foo/bar/", `/${string}/`>;
    type FooBarForever2 = AddUrlPathSegment<"/foo/bar", `${string}`>;
    type ForeverAndEver = AddUrlPathSegment<`/@${string}`, `${string}`>;

    type cases = [
      Expect<Equal<FooBar, "/foo/bar">>,
      Expect<Equal<FooBarTerminated, "/foo/bar">>,
      Expect<Equal<FooBarForever, `/foo/bar/${string}`>>,
      Expect<Equal<FooBarForever2, `/foo/bar/${string}`>>,
      Expect<Equal<ForeverAndEver, `/@${string}/${string}`>>,
    ];
    const cases: cases = [
      true, true, true, true, true
    ];
  });


  it("UrlsFrom<T,TOpt> with HTTP protocol", () => {
    type FooBar = UrlsFrom<"foo.bar">;
    type FooBarNoQp = UrlsFrom<"foo.bar", { queryParameters: "none"}>;
    type FooBarTerminated = UrlsFrom<"foo.bar/">;
    type FooBarBaz = UrlsFrom<"foo.bar/baz">;
    type FooBarBazQuery = UrlsFrom<"foo.bar/baz?name=Bob">;
    type FooBarOpt = UrlsFrom<"foo.bar", { protocolOptional: true }>;
    type FooBarInsecure = UrlsFrom<"foo.bar", { protocols: ["http", "https"] }>;

    type FooBarPort = UrlsFrom<"foo.bar", { portRequirement: "optional" }>;
    type FooBarSpecificPort = UrlsFrom<"foo.bar", { portRequirement: "optional", ports: 443 }>;
    type GenericStr = UrlsFrom<`youtube.com/@${string}`>;

    type cases = [
      Expect<Equal<FooBar, `https://foo.bar` | `https://foo.bar?${string}` | `https://foo.bar/${string}`>>,
      Expect<Equal<FooBarNoQp, `https://foo.bar` | `https://foo.bar/${string}`>>,
      Expect<Equal<FooBarTerminated,`https://foo.bar` | `https://foo.bar?${string}` | `https://foo.bar/${string}`>>,
      Expect<Equal<FooBarBaz,`https://foo.bar/baz` | `https://foo.bar/baz?${string}` | `https://foo.bar/baz/${string}`>>,
      Expect<Equal<FooBarBazQuery, `https://foo.bar/baz` | `https://foo.bar/baz?${string}` |`https://foo.bar/baz/${string}`>>,
      Expect<Equal<FooBarOpt, "foo.bar" | `foo.bar?${string}` | `foo.bar/${string}` | FooBar>>,
      Expect<Equal<FooBarInsecure, "http://foo.bar" | `http://foo.bar?${string}` | `http://foo.bar/${string}` | FooBar>>,

      ExpectTrue<Extends<
        FooBar | `https://foo.bar:${number}` | `https://foo.bar:${number}/${string}`,
        FooBarPort
      >>,
      ExpectTrue<Extends<
        FooBar | `https://foo.bar:443` | `https://foo.bar:443/${string}`,
        FooBarSpecificPort
      >>,
      Expect<Equal<GenericStr, `https://youtube.com/@${string}` | `https://youtube.com/@${string}?${string}`>>
    ];
    const cases: cases = [
      true, true, true, true,true,true,true,
      true, true, true
    ];
  });

  it("UrlsFrom<T,TOpt> with Websocket protocol", () => {
    type FooBar = UrlsFrom<"foo.bar", { protocols: ["wss"], queryParameters: "none"}>;
    type FooBarBaz = UrlsFrom<"foo.bar/baz", { protocols: ["wss"], queryParameters: "none"}>;
    type FooBarBazQuery = UrlsFrom<"foo.bar/baz?name=Bob", { protocols: ["wss"], queryParameters: "none"}>;
    type FooBarInsecure = UrlsFrom<"foo.bar", { protocols: ["ws", "wss"], queryParameters: "none"}>;

    type FooBarPort = UrlsFrom<"foo.bar", {
       portRequirement: "required",
        protocols: ["wss"],
        ports: 666
      }>;

    type cases = [
      Expect<Equal<FooBar, "wss://foo.bar" | `wss://foo.bar/${string}`>>,
      Expect<Equal<FooBarBaz, "wss://foo.bar/baz" | `wss://foo.bar/baz/${string}`>>,
      Expect<Equal<FooBarBazQuery, "wss://foo.bar/baz" | `wss://foo.bar/baz/${string}`>>,
      Expect<Equal<FooBarInsecure, "ws://foo.bar" | `ws://foo.bar/${string}` | FooBar>>,

      ExpectTrue<Extends<
        `wss://foo.bar:666` | `wss://foo.bar:666/${string}`,
        FooBarPort
      >>,
    ];
    const cases: cases = [
      true, true, true, true,
      true
    ];
  });

  it("Multiple inputs", () => {
    type FooBar = UrlsFrom<["foo.com", "bar.com"], { queryParameters: "none"}>;

    type cases = [
      Expect<Equal<
        FooBar,
        "https://foo.com" | `https://foo.com/${string}` |
        "https://bar.com" | `https://bar.com/${string}`
      >>
    ];
    const cases: cases = [
      true
    ];
  });

  it("IsUrl<TTest,[TProto]>", () => {
    type T1 = IsUrl<"https://foo.bar">;
    type T2 = IsUrl<"https://foo.bar/baz">;
    type T3 = IsUrl<"https://foo.bar/baz?name=Bob">;
    type T4 = IsUrl<"http://foo.bar", "http" | "https">;
    type T4b = IsUrl<"https://foo.bar", "http" | "https">;
    type T5 = IsUrl<"https://192.168.1.1:443/admin/console">;

    type T6 = IsUrl<"192.168.1.1", "optional">;
    type T7 = IsUrl<"192.168.1.1", "optional" | "https">;
    type T8 = IsUrl<"https://192.168.1.1", "optional" | "https">;

    type F1 = IsUrl<"foo.bar">;
    type F2 = IsUrl<"http://foo.bar">;
    type F3 = IsUrl<"https://foo.bar//baz">;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T4b>,
      ExpectTrue<T5>,

      ExpectTrue<T6>,
      ExpectTrue<T7>,
      ExpectTrue<T8>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
    const cases: cases = [
      true,true,true,true,true,true,
      true,true,true,
      false,false,false
    ];
  });


  it("urlMeta() runtime", () => {
    const google = urlMeta("https://google.com/foo/bar?track=123");
    expect(google.isUrl).toBe(true);
    expect(google.path).toBe("/foo/bar");
    expect(google.queryParameters).toBe("?track=123");
    expect(google.port).toBe("default");

    const homelab = urlMeta("https://192.168.1.1:443/admin/console");
    expect(homelab.isUrl).toBe(true);
    expect(homelab.source).toBe("192.168.1.1");
    expect(homelab.protocol).toBe("https");
    expect(homelab.port).toBe(443);
    expect(homelab.isIpAddress).toBe(true);
    expect(homelab.isIp4Address).toBe(true);
    expect(homelab.isIp6Address).toBe(false);

    type cases = [
      Expect<Equal<typeof google["url"], "https://google.com/foo/bar?track=123">>,
      Expect<Equal<typeof google["isUrl"], true>>,
      Expect<Equal<typeof google["path"], "/foo/bar">>,

      Expect<Equal<typeof homelab["source"], "192.168.1.1">>,
      Expect<Equal<typeof homelab["port"], 443>>,
      Expect<Equal<typeof homelab["isIpAddress"], true>>,
      Expect<Equal<typeof homelab["isIp4Address"], true>>,
      Expect<Equal<typeof homelab["isIp6Address"], false>>,
    ];
    const cases: cases = [
      true,true,true,
      true, true, true, true, true
    ];

  });


});
