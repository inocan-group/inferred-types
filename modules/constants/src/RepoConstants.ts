/**
 * common sources for source code repositories
 */
export const REPO_SOURCES = [
    "github",
    "bitbucket",
    "gitlab",
    "codecommit",
    "local",
] as const;

/**
 * page types you'd expect to find in a source code repository.
 */
export const REPO_PAGE_TYPES = [
    "repo",
    "commits",
    "author",
    "org",
    "profile",
    "issues",
    "actions",
    "followers",
    "following",
    "docs",
    "unknown",
] as const;

export const REPO_SOURCE_LOOKUP = {
    github: [`https://github.com`, "https://github.io"],
    bitbucket: ["https://bitbucket.org"],
    gitlab: ["https://gitlab.com"],
    codecommit: ["https://aws.amazon.com/codecommit/"],
    local: [],
} as const;

export const GITHUB_INSIGHT_CATEGORY_LOOKUP = {
    pulse: "pulse",
    contributors: "graphs/contributors",
    community: "graphs/community",
    standards: "community",
    traffic: "graphs/traffic",
    commits: "graphs/commit-activity",
    code_frequency: "graphs/code-frequency",
    dependencies: "network/dependencies",
    dependents: "network/dependents",
    dependabot: "network/updates",
    network: "network",
    forks: "forks",
    people: "people",
} as const;
