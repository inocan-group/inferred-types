import { Equal, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import type { AddUrlPathSegment, Expect, Extends, GetUrlPath, GetUrlPort, GetUrlProtocol, GetUrlQueryParams, GetUrlSource, IsUrl, RemoveUrlPort, Test, UrlPath, UrlPort, UrlsFrom } from "inferred-types/types";

import { getUrlPort, urlMeta } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe("Url testing", () => {

    it("UrlPath<T> happy path", () => {
        type Base = UrlPath;
        type FooBar = UrlPath<"/foo/bar">;

        type LeadingBadGuy = UrlPath<"/&foo/bar">;
        type TrailingBadGuy = UrlPath<"/foo/bar/*">;

        type cases = [
            Expect<Extends<"", Base>>,
            Expect<Extends<"/foo", Base>>,
            ExpectFalse<Extends<"/", Base>>,

            Expect<Test<FooBar, "equals", `/foo/bar`>>,

            Expect<Test<LeadingBadGuy, "isError", "invalid-character">>,
            Expect<Test<TrailingBadGuy, "isError", "invalid-character">>,
        ];

    });

    it("PortSpecifier", () => {
        type None = UrlPort<{ portRequirement: "not-allowed" }>;
        type Optional = UrlPort<{ portRequirement: "optional" }>;
        type Required = UrlPort<{ portRequirement: "required" }>;

        type Specific = UrlPort<{ portRequirement: "required", ports: 80 }>;
        type Multiple = UrlPort<{ portRequirement: "required", ports: 80 | 443 }>;

        type cases = [
            Expect<Test<None, "equals", "">>,
            Expect<Test<Optional, "equals", "" | `:${number}`>>,
            Expect<Test<Required, "equals", `:${number}`>>,

            Expect<Test<Specific, "equals", `:80`>>,
            Expect<Test<Multiple, "equals", `:80` | `:443`>>,
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
            Expect<Test<None, "equals", never>>,
            Expect<Test<FooBar, "equals", "foo.bar">>,
            Expect<Test<FooBarTerminated, "equals", "foo.bar">>,
            Expect<Test<Ip, "equals", "192.168.1.1">>,

            Expect<Test<JustPath, "equals", never>>,
            Expect<Test<FooBarBaz, "equals", "foo.bar">>,
            Expect<Test<IpBaz, "equals", "192.168.1.1">>,

            Expect<Test<BareFooBar, "equals", "foo.bar">>,
            Expect<Test<BareFooBarTerminated, "equals", "foo.bar">>,
            Expect<Test<BareIp, "equals", "192.168.1.1">>,

            Expect<Test<MissingMiddle, "equals", never>>,
            Expect<Test<MissingMiddle2, "equals", never>>,
        ];

    });

    it("GetUrlProtocol<T>", () => {
        type Https = GetUrlProtocol<"https://foo.bar/baz">;
        type Ftp = GetUrlProtocol<"ftp://foo.bar">;
        type Union = GetUrlProtocol<"http://foo.bar/baz" | "https://foo.bar/baz">;

        type cases = [
            Expect<Test<Https, "equals", "https">>,
            Expect<Test<Ftp, "equals", "ftp">>,
            Expect<Test<Union, "equals", "http" | "https">>,
        ];
    });

    it("GetUrlQueryParams<T>", () => {
        type None = GetUrlQueryParams<"https://github.com/foo/bar">;
        type One = GetUrlQueryParams<"https://github.com/foo/bar?name=Bob">;
        type Two = GetUrlQueryParams<"https://github.com/foo/bar?name=Bob&age=36">;

        type cases = [
            Expect<Test<None, "equals", "">>,
            Expect<Test<One, "equals", "?name=Bob">>,
            Expect<Test<Two, "equals", "?name=Bob&age=36">>,
        ];
    });

    it("RemoveUrlPPort", () => {
        type Homelab = RemoveUrlPort<"https://192.168.1.1:443/admin/console">;
        type Union = RemoveUrlPort<`https://192.168.1.1:${"443" | "80"}/admin/console`>;
        type AtEnd = RemoveUrlPort<"https://192.168.1.1:443">;
        type WideNum = RemoveUrlPort<`https://192.168.1.1:${number}`>;

        type cases = [
            Expect<Test<Homelab, "equals", "https://192.168.1.1/admin/console">>,
            Expect<Test<Union, "equals", "https://192.168.1.1/admin/console">>,
            Expect<Test<AtEnd, "equals", "https://192.168.1.1">>,
            Expect<Test<WideNum, "equals", "https://192.168.1.1">>,
        ];
    });

    it("GetUrlPort<T>", () => {
        type OnlyPort = GetUrlPort<":443">;
        type InUrl = GetUrlPort<`https://facebook.com:456/path/to/thing`>;
        type Inferred = GetUrlPort<`https://facebook.com/path/to/thing`>;
        type Inferred2 = GetUrlPort<`https://facebook.com/path/to/thing`, true>;

        type cases = [
            Expect<Test<OnlyPort, "equals", 443>>,
            Expect<Test<InUrl, "equals", 456>>,
            Expect<Test<Inferred, "equals", "default">>,
            Expect<Test<Inferred2, "equals", 443>>,
        ];

    });

    it("getUrlPort() runtime", () => {
        const onlyPort = getUrlPort(":443");
        const urlInferred = getUrlPort("https://facebook.com");
        const urlResolved = getUrlPort("https://facebook.com", true);
        const invalid = getUrlPort("");
        const invalid2 = getUrlPort("", true);
        const explicit = getUrlPort(`https://192.168.1.1:443/admin/console`);

        expect(onlyPort).toEqual(443);
        expect(urlInferred).toEqual("default");
        expect(urlResolved).toEqual(443);
        expect(invalid).toEqual(null);
        expect(invalid2).toEqual(null);
        expect(explicit).toEqual(443);

        type cases = [
            /** type tests */
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
            Expect<Test<FooBarBaz, "equals", "/baz">>,
            Expect<Test<FooBarTerminated, "equals", "">>,
            Expect<Test<FooBarBazQuery, "equals", "/baz">>,
            Expect<Test<BareBaz, "equals", "/baz">>,
            Expect<Test<BareQuery, "equals", "">>,
            Expect<Test<InvalidPath, "equals", never>>,

            Expect<Test<NoPath, "equals", "">>,
            Expect<Test<NoPath2, "equals", "">>,

            Expect<Test<Port, "equals", "">>,
            Expect<Test<PortAndPath, "equals", "/baz">>,
            Expect<Test<Homelab, "equals", "/admin/console">>,

            Expect<Test<SimpleFooBar, "equals", "">>,
            Expect<Test<SimpleFooBarBaz, "equals", "/baz">>,

            Expect<Test<WithStrGeneric, "equals", `/@${string}`>>,
            Expect<Test<DoubleSlash, "equals", never>>,
            Expect<Test<DoubleSlashLater, "equals", never>>,
        ];
    });

    it("AddUrlPathSegment<TExisting,TAdd>", () => {
        type FooBar = AddUrlPathSegment<"/foo", "bar">;
        type FooBarTerminated = AddUrlPathSegment<"/foo", "/bar/">;
        type FooBarForever = AddUrlPathSegment<"/foo/bar/", `/${string}/`>;
        type FooBarForever2 = AddUrlPathSegment<"/foo/bar", `${string}`>;
        type ForeverAndEver = AddUrlPathSegment<`/@${string}`, `${string}`>;

        type cases = [
            Expect<Test<FooBar, "equals", "/foo/bar">>,
            Expect<Test<FooBarTerminated, "equals", "/foo/bar">>,
            Expect<Test<FooBarForever, "equals", `/foo/bar/${string}`>>,
            Expect<Test<FooBarForever2, "equals", `/foo/bar/${string}`>>,
            Expect<Test<ForeverAndEver, "equals", `/@${string}/${string}`>>,
        ];
    });

    it("UrlsFrom<T,TOpt> with HTTP protocol", () => {
        type FooBar = UrlsFrom<"foo.bar">;
        type FooBarNoQp = UrlsFrom<"foo.bar", { queryParameters: "none" }>;
        type FooBarTerminated = UrlsFrom<"foo.bar/">;
        type FooBarBaz = UrlsFrom<"foo.bar/baz">;
        type FooBarBazQuery = UrlsFrom<"foo.bar/baz?name=Bob">;
        type FooBarOpt = UrlsFrom<"foo.bar", { protocolOptional: true }>;
        type FooBarInsecure = UrlsFrom<"foo.bar", { protocols: ["http", "https"] }>;

        type FooBarPort = UrlsFrom<"foo.bar", { portRequirement: "optional" }>;
        type FooBarSpecificPort = UrlsFrom<"foo.bar", { portRequirement: "optional", ports: 443 }>;
        type GenericStr = UrlsFrom<`youtube.com/@${string}`>;

        type cases = [
            Expect<Test<FooBar, "equals", `https://foo.bar` | `https://foo.bar?${string}` | `https://foo.bar/${string}`>>,
            Expect<Test<FooBarNoQp, "equals", `https://foo.bar` | `https://foo.bar/${string}`>>,
            Expect<Test<FooBarTerminated, "equals", `https://foo.bar` | `https://foo.bar?${string}` | `https://foo.bar/${string}`>>,
            Expect<Test<FooBarBaz, "equals", `https://foo.bar/baz` | `https://foo.bar/baz?${string}` | `https://foo.bar/baz/${string}`>>,
            Expect<Test<FooBarBazQuery, "equals", `https://foo.bar/baz` | `https://foo.bar/baz?${string}` | `https://foo.bar/baz/${string}`>>,
            Expect<Test<FooBarOpt, "equals", "foo.bar" | `foo.bar?${string}` | `foo.bar/${string}` | FooBar>>,
            Expect<Test<FooBarInsecure, "equals", "http://foo.bar" | `http://foo.bar?${string}` | `http://foo.bar/${string}` | FooBar>>,

            ExpectTrue<Extends<
                FooBar | `https://foo.bar:${number}` | `https://foo.bar:${number}/${string}`,
                FooBarPort
            >>,
            ExpectTrue<Extends<
                FooBar | `https://foo.bar:443` | `https://foo.bar:443/${string}`,
                FooBarSpecificPort
            >>,
            Expect<Test<GenericStr, "equals", `https://youtube.com/@${string}` | `https://youtube.com/@${string}?${string}`>>
        ];
    });

    it("UrlsFrom<T,TOpt> with Websocket protocol", () => {
        type FooBar = UrlsFrom<"foo.bar", { protocols: ["wss"], queryParameters: "none" }>;
        type FooBarBaz = UrlsFrom<"foo.bar/baz", { protocols: ["wss"], queryParameters: "none" }>;
        type FooBarBazQuery = UrlsFrom<"foo.bar/baz?name=Bob", { protocols: ["wss"], queryParameters: "none" }>;
        type FooBarInsecure = UrlsFrom<"foo.bar", { protocols: ["ws", "wss"], queryParameters: "none" }>;

        type FooBarPort = UrlsFrom<"foo.bar", {
            portRequirement: "required",
            protocols: ["wss"],
            ports: 666
        }>;

        type cases = [
            Expect<Test<FooBar, "equals", "wss://foo.bar" | `wss://foo.bar/${string}`>>,
            Expect<Test<FooBarBaz, "equals", "wss://foo.bar/baz" | `wss://foo.bar/baz/${string}`>>,
            Expect<Test<FooBarBazQuery, "equals", "wss://foo.bar/baz" | `wss://foo.bar/baz/${string}`>>,
            Expect<Test<FooBarInsecure, "equals", "ws://foo.bar" | `ws://foo.bar/${string}` | FooBar>>,

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
        type FooBar = UrlsFrom<["foo.com", "bar.com"], { queryParameters: "none" }>;

        type cases = [
            Expect<Equal<
                FooBar,
                "https://foo.com" | `https://foo.com/${string}` |
                "https://bar.com" | `https://bar.com/${string}`
            >>
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
            Expect<Test<typeof google["url"], "equals", "https://google.com/foo/bar?track=123">>,
            Expect<Test<typeof google["isUrl"], "equals", true>>,
            Expect<Test<typeof google["path"], "equals", "/foo/bar">>,

            Expect<Test<typeof homelab["source"], "equals", "192.168.1.1">>,
            Expect<Test<typeof homelab["port"], "equals", 443>>,
            Expect<Test<typeof homelab["isIpAddress"], "equals", true>>,
            Expect<Test<typeof homelab["isIp4Address"], "equals", true>>,
            Expect<Test<typeof homelab["isIp6Address"], "equals", false>>,
        ];
    });

});
