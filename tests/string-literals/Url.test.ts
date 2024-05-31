import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {
  AddUrlPathSegment,
  Extends,
  GetUrlSource,
  GetUrlPath,
  PortSpecifier,
  UrlPath,
  UrlsFrom
} from "src/types/index";
import { describe, it } from "vitest";

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
    type None = PortSpecifier<{portRequirement: "not-allowed"}>;
    type Optional = PortSpecifier<{portRequirement: "optional"}>;
    type Required = PortSpecifier<{portRequirement: "required"}>;

    type Specific = PortSpecifier<{portRequirement: "required", ports: 80}>;
    type Multiple = PortSpecifier<{portRequirement: "required", ports: 80 | 443}>;

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
      Expect<Equal<None, "">>,
      Expect<Equal<FooBar, "foo.bar">>,
      Expect<Equal<FooBarTerminated, "foo.bar">>,
      Expect<Equal<Ip, "192.168.1.1">>,

      Expect<Equal<JustPath, "">>,
      Expect<Equal<FooBarBaz, "foo.bar">>,
      Expect<Equal<IpBaz, "192.168.1.1">>,

      Expect<Equal<BareFooBar, "foo.bar">>,
      Expect<Equal<BareFooBarTerminated, "foo.bar">>,
      Expect<Equal<BareIp, "192.168.1.1">>,

      Expect<Equal<MissingMiddle, "">>,
      Expect<Equal<MissingMiddle2, "">>,
    ];
    const cases: cases = [
      true, true, true, true,
      true, true, true,
      true, true, true,
      true, true,
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

    type SimpleFooBar = GetUrlPath<"foo.bar">;
    type SimpleFooBarBaz = GetUrlPath<"foo.bar/baz">;


    type cases = [
      Expect<Equal<FooBarBaz, "/baz">>,
      Expect<Equal<FooBarTerminated, "">>,
      Expect<Equal<FooBarBazQuery, "/baz">>,
      Expect<Equal<BareBaz, "/baz">>,
      Expect<Equal<BareQuery, "">>,
      Expect<Equal<InvalidPath, ''>>,

      Expect<Equal<NoPath, ''>>,
      Expect<Equal<NoPath2, ''>>,

      Expect<Equal<SimpleFooBar, ''>>,
      Expect<Equal<SimpleFooBarBaz, '/baz'>>,
    ];
    const cases: cases = [
      true, true, true, true,true,true,
      true, true,
      true, true,
    ];
  });


  it("AddUrlPathSegment<TExisting,TAdd>", () => {
    type FooBar = AddUrlPathSegment<"/foo", "bar">;
    type FooBarTerminated = AddUrlPathSegment<"/foo", "/bar/">;
    type FooBarForever = AddUrlPathSegment<"/foo/bar/", `/${string}/`>;
    type FooBarForever2 = AddUrlPathSegment<"/foo/bar", `${string}`>;

    type cases = [
      Expect<Equal<FooBar, "/foo/bar">>,
      Expect<Equal<FooBarTerminated, "/foo/bar">>,
      Expect<Equal<FooBarForever, `/foo/bar/${string}`>>,
      Expect<Equal<FooBarForever2, `/foo/bar/${string}`>>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });


  it("UrlsFrom<T,TOpt> with HTTP protocol", () => {
    type FooBar = UrlsFrom<"foo.bar">;
    type FooBarTerminated = UrlsFrom<"foo.bar/">;
    type FooBarBaz = UrlsFrom<"foo.bar/baz">;
    type FooBarBazQuery = UrlsFrom<"foo.bar/baz?name=Bob">;
    type FooBarOpt = UrlsFrom<"foo.bar", { optional: true }>;
    type FooBarInsecure = UrlsFrom<"foo.bar", { allowInsecure: true }>;

    type FooBarPort = UrlsFrom<"foo.bar", { portRequirement: "optional" }>;

    type cases = [
      Expect<Equal<FooBar, `https://foo.bar` | `https://foo.bar/${string}`>>,
      Expect<Equal<FooBarTerminated,`https://foo.bar` | `https://foo.bar/${string}`>>,
      Expect<Equal<FooBarBaz,`https://foo.bar/baz` | `https://foo.bar/baz/${string}`>>,
      Expect<Equal<FooBarBazQuery, `https://foo.bar/baz` |`https://foo.bar/baz/${string}`>>,
      Expect<Equal<FooBarOpt, "foo.bar" | `foo.bar/${string}` | FooBar>>,
      Expect<Equal<FooBarInsecure, "http://foo.bar" | `http://foo.bar/${string}` | FooBar>>,

      ExpectTrue<Extends<
        FooBar | `https://foo.bar:${number}` | `https://foo.bar:${number}/${string}`,
        FooBarPort
      >>,
    ];
    const cases: cases = [
      true, true, true, true,true,true,
      true
    ];
  });

  it("UrlsFrom<T,TOpt> with Websocket protocol", () => {
    type FooBar = UrlsFrom<"foo.bar", {protocol: "ws"}>;
    type FooBarBaz = UrlsFrom<"foo.bar/baz", {protocol: "ws"}>;
    type FooBarBazQuery = UrlsFrom<"foo.bar/baz?name=Bob", {protocol: "ws"}>;
    type FooBarOpt = UrlsFrom<"foo.bar", { optional: true, protocol: "ws" }>;
    type FooBarInsecure = UrlsFrom<"foo.bar", { allowInsecure: true, protocol: "ws" }>;

    type FooBarPort = UrlsFrom<"foo.bar", { portRequirement: "optional", protocol: "ws" }>;

    type cases = [
      Expect<Equal<FooBar, "wss://foo.bar" | `wss://foo.bar/${string}`>>,
      Expect<Equal<FooBarBaz, "wss://foo.bar/baz" | `wss://foo.bar/baz/${string}`>>,
      Expect<Equal<FooBarBazQuery, "wss://foo.bar/baz" | `wss://foo.bar/baz/${string}`>>,
      Expect<Equal<FooBarOpt, "foo.bar" | `foo.bar/${string}` | FooBar>>,
      Expect<Equal<FooBarInsecure, "ws://foo.bar" | `ws://foo.bar/${string}` | FooBar>>,

      ExpectTrue<Extends<
        FooBar | `wss://foo.bar:${number}` | `wss://foo.bar:${number}/${string}`,
        FooBarPort
      >>,
    ];
    const cases: cases = [
      true, true, true, true,true,
      true
    ];
  });

  it("Multiple inputs", () => {
    type FooBar = UrlsFrom<["foo.com", "bar.com"]>;

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

});
