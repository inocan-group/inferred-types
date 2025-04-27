import { Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Extends, RepoUrls, SemanticVersion } from "inferred-types/types";



describe("Repo related utilities", () => {
    it("RepoUrls - happy path", () => {

        type cases = [
            Expect<Extends<"https://github.com", RepoUrls>>,
            Expect<Extends<"https://github.com/inferred-types", RepoUrls>>,
            Expect<Extends<"https://bitbucket.org/inferred-types", RepoUrls>>,
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
        type T1 = Extends<"1.1.1", SemanticVersion<true>>;
        type T2 = Extends<"v1.1.1", SemanticVersion>;
        type T3 = Extends<"v 1.1.1", SemanticVersion>;
        type T4 = Extends<"1.1.1", SemanticVersion<false>>;

        type F1 = Extends<"v 1.1.1", SemanticVersion<false>>;
        type F2 = Extends<"v1.1.1", SemanticVersion<false>>;
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




});
