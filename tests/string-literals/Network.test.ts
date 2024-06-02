import { ExpectFalse, ExpectTrue, IsFalse, IsTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsDomainName, IsIp4Octet, IsIp6HexGroup, IsIpAddress } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Network utilities", () => {

  it("IsDomainName<T>", () => {
    type T1 = IsDomainName<"amazon.com">;
    type T2 = IsDomainName<"amazon.co.uk">;
    type T3 = IsDomainName<"foo.bar">;
    type T4 = IsDomainName<"foo.bar.baz">;
    type T5 = IsDomainName<"foo-bar.com">;

    type F1 = IsDomainName<"foo.b">;
    type F2 = IsDomainName<"foo.b">;
    type F3 = IsDomainName<"foo.bar^.baz">;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
    const cases: cases = [
      true, true,true, true,true,
      false, false, false

    ];
  });


  it("IsIp4Octet<T>", () => {
    type T1 = IsIp4Octet<"255">;
    type T2 = IsIp4Octet<"0">;
    type T3 = IsIp4Octet<"12">;
    type T4 = IsIp4Octet<255>;
    type T5 = IsIp4Octet<0>;
    type T6 = IsIp4Octet<12>;

    type F1 = IsIp4Octet<"fe">;
    type F2 = IsIp4Octet<"256">;
    type F3 = IsIp4Octet<"-1">;
    type F4 = IsIp4Octet<256>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
      ExpectFalse<F4>,
    ];
    const cases: cases = [
      true,true,true,true,true,true,
      false, false, false, false
    ];
  });



  it("IsIp6HexGroup<T>", () => {
    type T1 = IsIp6HexGroup<"fe08">;
    type T2 = IsIp6HexGroup<"fe0">;
    type T3 = IsIp6HexGroup<"f0">;
    type T4 = IsIp6HexGroup<"fe">;

    type F1 = IsIp6HexGroup<"ge08">;
    type F2 = IsIp6HexGroup<"fe089">;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
    ];
    const cases: cases = [
      true, true, true,true,
      false, false,
    ];

  });


  it("IsIpAddress", () => {
    type T1 = IsIpAddress<"192.168.1.1">;
    type T2 = IsIpAddress<"10.0.0.1">;
    type T3 = IsIpAddress<"127.0.0.1">;

    type T4 = IsIpAddress<"fe89:0000:0000:0000:0000:0000:0000:0000">;
    type T5 = IsIpAddress<"fe89::0000:0000::0000::0000">;

    type F1 = IsIpAddress<"192.168.1.1.1">;
    type F2 = IsIpAddress<"192.256.1.1">;
    type F3 = IsIpAddress<"192.168.1.1/">;
    type F4 = IsIpAddress<"192.168.1.1.1">;

    type F5 = IsIpAddress<"fe89:0000:h000:0000:0000:0000:0000:0000">;
    type F6 = IsIpAddress<"fe89:0000:0000:0000:0000:0000:0000">;

    type cases = [
      IsTrue<T1>,
      IsTrue<T2>,
      IsTrue<T3>,

      IsTrue<T4>,
      IsTrue<T5>,

      IsFalse<F1>,
      IsFalse<F2>,
      IsFalse<F3>,
      IsFalse<F4>,

      IsFalse<F5>,
      IsFalse<F6>,
    ];

    const cases: cases = [
      true,true,true,
      true,true,
      false, false, false, false,
      false, false
    ];

  });

});
