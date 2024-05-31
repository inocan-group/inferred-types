
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
  "issues",
  "followers",
  "following",
  "docs",
  "unknown"
] as const;


export const REPO_SOURCE_LOOKUP = {
  "github": ["github.com", "github.io"],
  "bitbucket": ["bitbucket.com"],
  "gitlab": ["gitlab.com"],
  "codecommit": ["https://aws.amazon.com/codecommit/"],
  "local": []
} as const;


