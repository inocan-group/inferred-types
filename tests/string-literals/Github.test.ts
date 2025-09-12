import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import type { DoesNotExtend, Expect, Extends, GithubRepoIssuesListUrl, GithubRepoIssueUrl, GithubRepoProjectsUrl, GithubRepoProjectUrl, GithubRepoReleasesUrl, GithubRepoReleaseTagUrl, GithubRepoUrl, Test } from "inferred-types/types";
import {
    isGithubIssuesListUrl,
    isGithubIssueUrl,
    isGithubProjectsListUrl,
    isGithubProjectUrl,
    isGithubReleasesListUrl,
    isGithubReleaseTagUrl,
    isGithubRepoUrl
} from "inferred-types/runtime";

import { describe, expect, it } from "vitest";

describe("Github types and type guards", () => {

  it("GithubRepoUrl<T> and isGithubRepoUrl()", () => {
    type T1 = Extends<"https://github.com/inocan-group/inferred-types", GithubRepoUrl>;
    type F1 = Extends<"https://github.com/inferred-types", GithubRepoUrl>;

    const bad = "https://github.com/inferred-types";
    const repo = "https://github.com/inocan-group/inferred-types";
    const repoWide = "https://github.com/inocan-group/inferred-types" as string;

    expect(isGithubRepoUrl(repo)).toEqual(true);

    if (isGithubRepoUrl(repo)) {
      // @ts-ignore
      type cases1 = [
        Expect<Test<typeof repo, "equals",  typeof repo>>
      ]
    }
    if (isGithubRepoUrl(repoWide)) {
      // @ts-ignore
      type cases1 = [
        Expect<Test<typeof repoWide, "equals",  GithubRepoUrl>>
      ]
    }

    const f1 = isGithubRepoUrl(bad);
    expect(f1).toEqual(false);

    if (isGithubRepoUrl(bad)) {
      // @ts-ignore
      type cases1 = [
        Expect<Test<typeof bad, "equals",  never>>
      ]
    }

    type cases = [
      ExpectTrue<T1>,
      ExpectFalse<F1>,
    ];
    const cases: cases = [
      true, false,
    ];
  });

  it("GithubIssuesUrl, GithubIssueUrl, and type guards ", () => {
    const validIssueList = "https://github.com/inocan-group/inferred-types/issues";
    const validIssue = "https://github.com/inocan-group/inferred-types/issues/001";
    const validIssueWithQuery = "https://github.com/inocan-group/inferred-types/issues/001?foo=bar";

    const malformedIssue = "https://github.com/inferred-types/issues/001";

    expect(isGithubIssuesListUrl(validIssueList)).toBe(true);
    expect(isGithubIssueUrl(validIssue)).toBe(true);
    expect(isGithubIssueUrl(validIssueWithQuery)).toBe(true);

    type cases = [
        Expect<Test<typeof validIssueList, "extends", GithubRepoIssuesListUrl>>,
        Expect<Test<typeof validIssue, "extends", GithubRepoIssueUrl>>,
        Expect<Test<typeof validIssueWithQuery, "extends", GithubRepoIssueUrl>>,

        Expect<Test<
            typeof malformedIssue, "doesNotExtend",
            GithubRepoIssueUrl
        >>,
    ];

  });

  it("GithubProjectsUrl, GithubProjectUrl, and type guards ", () => {
    const validProjectList = "https://github.com/inocan-group/inferred-types/projects";
    const validProject = "https://github.com/inocan-group/inferred-types/projects/001";
    const validProjectWithQuery = "https://github.com/inocan-group/inferred-types/projects/001?foo=bar"

    const malformedList = "https://github.com/inocan-group/projects"
    const malformedProject = "https://github.com/inocan-group/projects/001"

    expect(isGithubProjectsListUrl(validProjectList)).toBe(true);
    expect(isGithubProjectUrl(validProject)).toBe(true);
    expect(isGithubProjectUrl(validProjectWithQuery)).toBe(true);

    expect(isGithubProjectsListUrl(malformedList)).toBe(false);
    expect(isGithubProjectUrl(malformedProject)).toBe(false);

    type cases = [
        Expect<Test<typeof validProjectList, "extends", GithubRepoProjectsUrl>>,
        Expect<Test<typeof validProject, "extends", GithubRepoProjectUrl>>,
        Expect<Test<typeof validProjectWithQuery, "extends", GithubRepoProjectUrl>>,

        Expect<Test<typeof malformedList, "doesNotExtend", GithubRepoProjectsUrl>>,
        Expect<Test<typeof malformedProject, "doesNotExtend", GithubRepoProjectUrl>>,
    ];

  });

  it("GithubReleasesUrl, GithubReleaseUrl, and type guards ", () => {
    const validReleaseList = "https://github.com/inocan-group/inferred-types/releases";
    const validRelease = "https://github.com/inocan-group/inferred-types/releases/tag/v0.0.0";
    const validReleaseWithQuery = "https://github.com/inocan-group/inferred-types/releases/tag/v.0.0.0?foo=bar"

    const malformedList = "https://github.com/inocan-group/releases"
    const malformedRelease = "https://github.com/inocan-group/releases/001"

    type T1 = Extends<typeof validReleaseList, GithubRepoReleasesUrl>;
    type T2 = Extends<typeof validRelease, GithubRepoReleaseTagUrl>;
    type T3 = Extends<typeof validReleaseWithQuery, GithubRepoReleaseTagUrl>;

    type F1 = DoesNotExtend<typeof malformedList, GithubRepoReleasesUrl>;
    type F2 = DoesNotExtend<typeof malformedRelease, GithubRepoReleaseTagUrl>;

    expect(isGithubReleasesListUrl(validReleaseList)).toBe(true);
    expect(isGithubReleaseTagUrl(validRelease)).toBe(true);
    expect(isGithubReleaseTagUrl(validReleaseWithQuery)).toBe(true);

    expect(isGithubReleasesListUrl(malformedList)).toBe(false);
    expect(isGithubReleaseTagUrl(malformedRelease)).toBe(false);

    type cases = [
        Expect<Test<typeof validReleaseList, "extends", GithubRepoReleasesUrl>>,
        Expect<Test<typeof validRelease, "extends", GithubRepoReleaseTagUrl>>,
        Expect<Test<typeof validReleaseWithQuery, "extends", GithubRepoReleaseTagUrl>>,

        Expect<Test<typeof malformedList, "doesNotExtend", GithubRepoReleasesUrl>>,
        Expect<Test<typeof malformedRelease, "doesNotExtend", GithubRepoReleaseTagUrl>>,
    ];

  });

});
