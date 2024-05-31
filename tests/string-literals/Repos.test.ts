import { Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Extends,  GithubIssuesUrl, GithubRepoUrl, IsNever, RepoUrls, SemanticVersion } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Repo related utilities", () => {
  it("RepoUrls - happy path", () => {

    type cases = [
      Expect<Extends<"https://github.com", RepoUrls>>,
      Expect<Extends<"https://github.com/inferred-types", RepoUrls>>,
      Expect<Extends<"https://bitbucket.com/inferred-types", RepoUrls>>,
      Expect<Extends<"https://gitlab.com/inferred-types", RepoUrls>>,
      Expect<Extends<"https://aws.amazon.com/codecommit/inferred-types", RepoUrls>>,

      ExpectFalse<Extends<"https://github.comm", RepoUrls>>,
      ExpectFalse<Extends<"http://github.com/", RepoUrls>>,

    ];
    const cases: cases = [
      true, true, true, true, true,
      false, false,
    ];
  });


  it("SemanticVersion", () => {
    type T1  = Extends<"1.1.1", SemanticVersion>;
    type T2  = Extends<"v1.1.1", SemanticVersion>;
    type T3  = Extends<"v 1.1.1", SemanticVersion>;
    type T4  = Extends<"1.1.1", SemanticVersion<false>>;

    type F1 = Extends<"v 1.1.1", SemanticVersion<false>>;
    type F2  = Extends<"v1.1.1", SemanticVersion<false>>;
    type F3 = Extends<"v. 1.1.1", SemanticVersion>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
    const cases: cases = [
      true, true, true, true,
      false, false, false
    ];
  });



  it("GithubRepoUrl<T>", () => {
    type T1 = Extends<"https://github.com/inocan-group/inferred-types", GithubRepoUrl>;
    type F1 = Extends<"https://github.com/inferred-types", GithubRepoUrl>;

    type T2 = GithubRepoUrl<"https://github.com/inocan-group/inferred-types">;
    type N2 = GithubRepoUrl<"https://github.com/inocan-group/inferred-types/issues">;

    type cases = [
      ExpectTrue<T1>,
      ExpectFalse<F1>,

      Expect<Extends<T2, string>>,
      IsNever<N2>,
    ];
    const cases: cases = [
      true, false,
      true, true,
    ];
  });


  it("GithubIssuesUrl<T>", () => {
    type T1 = Extends<"https://github.com/inocan-group/inferred-types/issues", GithubIssuesUrl>;
    type T2 = Extends<"https://github.com/inocan-group/inferred-types/issues/001", GithubIssuesUrl>;
    type F1 = Extends<"https://github.com/inocan-group/inferred-types", GithubIssuesUrl>;
    type F2 = Extends<"https://github.com/inocan-group/inferred-types/issues/001", GithubIssuesUrl<true>>;


    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectFalse<F1>,
      ExpectFalse<F2>,

    ];
    const cases: cases = [
      true, true,
      false,false
    ];
  });



});
